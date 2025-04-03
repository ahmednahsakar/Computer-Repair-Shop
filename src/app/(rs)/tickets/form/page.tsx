import { getCustomer } from "@/lib/queries/getCustomers"; // Import function to fetch customer details
import { getTicket } from "@/lib/queries/getTicket"; // Import function to fetch ticket details
import { BackButton } from "@/components/BackButton"; // Import BackButton component for navigation
import * as Sentry from "@sentry/nextjs"; // Import Sentry for error tracking
import TicketForm from "@/app/(rs)/tickets/form/TicketForm"; // Import TicketForm component

const TicketFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const { customerId, ticketId } = await searchParams; // Extract customerId and ticketId from search parameters

    if (!customerId && !ticketId) {
      // If both IDs are missing, display an error message
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" />
        </>
      );
    }

    // If customerId is provided, load the customer details
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId)); // Fetch customer details

      if (!customer) {
        // If customer is not found, show an error message
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID # {customerId} not found
            </h2>
            <BackButton title="Go Back" />
          </>
        );
      }

      if (!customer.active) {
        // If the customer is inactive, show an error message
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID # {customerId} is not active
            </h2>
            <BackButton title="Go Back" />
          </>
        );
      }

      console.log(customer); // Debugging log
      return <TicketForm customer={customer} />; // Return TicketForm for a new ticket
    }

    // If ticketId is provided, load the ticket details
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId)); // Fetch ticket details

      if (!ticket) {
        // If ticket is not found, show an error message
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID # {ticketId} not found</h2>
            <BackButton title="Go Back" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId); // Fetch the customer associated with the ticket

      console.log("ticket: ", ticket); // Debugging log
      console.log("customer: ", customer); // Debugging log
      return <TicketForm customer={customer} ticket={ticket} />; // Return TicketForm for editing
    }
  } catch (err) {
    if (err instanceof Error) {
      Sentry.captureException(err); // Capture errors using Sentry
      throw err; // Rethrow error for further handling
    }
  }
};

export default TicketFormPage; // Export TicketFormPage component
