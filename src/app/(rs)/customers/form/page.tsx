import { getCustomer } from "@/lib/queries/getCustomers"; // Import function to fetch customer details
import { BackButton } from "@/components/BackButton"; // Import BackButton component for navigation
import * as Sentry from "@sentry/nextjs"; // Import Sentry for error tracking
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm"; // Import CustomerForm component

const CustomerFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    // Extract customer ID from search parameters
    const { customerId } = await searchParams;

    // If a customer ID is provided, attempt to fetch the customer data
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      // If no customer is found, display an error message with a back button
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID # {customerId} not found
            </h2>
            <BackButton title="Go Back" />
          </>
        );
      }

      console.log(customer); // Debugging: Log the retrieved customer data

      // Render the CustomerForm with the existing customer data for editing
      return <CustomerForm customer={customer} />;
    } else {
      // If no customer ID is provided, render a blank CustomerForm for a new customer
      return <CustomerForm />;
    }
  } catch (err) {
    // Capture and report errors using Sentry
    if (err instanceof Error) {
      Sentry.captureException(err);
      throw err; // Re-throw the error to be handled at a higher level
    }
  }
};

export default CustomerFormPage;
