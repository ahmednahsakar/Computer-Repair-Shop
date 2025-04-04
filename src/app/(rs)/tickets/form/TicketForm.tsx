// Ensures this component runs on the client side (Next.js directive)
"use client";

// Import necessary hooks and utilities for form handling
import { useForm } from "react-hook-form"; // React Hook Form for managing form state
import { zodResolver } from "@hookform/resolvers/zod"; // Integrates Zod validation with React Hook Form

// Import custom UI components for form elements
import { Form } from "@/components/ui/form"; // Wrapper for the form
import { Button } from "@/components/ui/button"; // Button component

// Import custom input components for form fields
import { InputWithLabel } from "@/components/inputs/InputWithLabel"; // Input field with a label
import { SelectWithLabel } from "@/components/inputs/SelectWithLable"; // Select dropdown with a label
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"; // Textarea field with a label
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"; // Checkbox field with a label

// Import Zod schemas and types for form validation
import {
  insertTicketSchema, // Schema for inserting a new ticket
  type insertTicketSchemaType, // Type definition for inserting a new ticket
  type selectTicketSchemaType, // Type definition for selecting a ticket
} from "@/zod-schemas/ticket";
import { selectCustomerSchemaType } from "@/zod-schemas/customer"; // Type definition for selecting a customer

// Define the props for the TicketForm component
type Props = {
  customer: selectCustomerSchemaType; // Customer information
  ticket?: selectTicketSchemaType; // Optional existing ticket information (for editing)
};

// Define the TicketForm component
export default function TicketForm({ customer, ticket }: Props) {
  // Define default values for the form fields, using existing ticket data if available
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)", // Use ticket ID if available; otherwise, display "(New)"
    customerId: ticket?.customerId ?? customer.id, // Associate ticket with the customer
    title: ticket?.title ?? "", // Use existing title or an empty string
    description: ticket?.description ?? "", // Use existing description or an empty string
    completed: ticket?.completed ?? false, // Default to "not completed"
    tech: ticket?.tech ?? "new-ticket@example.com", // Default tech field value
  };

  // Initialize the form using React Hook Form with validation via Zod
  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur", // Validate fields when they lose focus
    resolver: zodResolver(insertTicketSchema), // Use Zod schema for validation
    defaultValues, // Set initial form values
  });

  // Define the form submission handler
  async function submitForm(data: insertTicketSchemaType) {
    console.log(data); // Log the submitted form data (replace with API call in production)
  }

  return (
    // Main container with spacing and layout adjustments
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        {/* Display a heading with conditional text for new/edit mode */}
        <h2 className="text-2xl font-bold">
          {ticket?.id ? `Edit Ticket # ${ticket.id}` : "New Ticket Form"}
        </h2>
      </div>

      {/* Wrap the form component with React Hook Form context */}
      <Form {...form}>
        {/* Form element with submission handler */}
        <form
          onSubmit={form.handleSubmit(submitForm)} // Handle form submission
          className="flex flex-col md:flex-row gap-4 md:gap-8" // Layout styles
        >
          {/* Left column containing input fields */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* Title input field */}
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
            />

            {/* Tech input field (disabled) */}
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Tech"
              nameInSchema="tech"
              disabled={true} // Prevents editing this field
            />

            {/* Checkbox input for marking the ticket as completed */}
            <CheckboxWithLabel<insertTicketSchemaType>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />

            {/* Customer information section */}
            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" /> {/* Horizontal line for separation */}
              <p>
                {customer.firstName} {customer.lastName}
                {/* Display full name */}
              </p>
              <p>{customer.address1}</p> {/* Display primary address */}
              {customer.address2 ? <p>{customer.address2}</p> : null}
              {/* Display secondary address if available */}
              <p>
                {customer.city}, {customer.state} {customer.zip}
                {/* Display city, state, and ZIP code */}
              </p>
              <hr className="w-4/5" /> {/* Another horizontal line */}
              <p>{customer.email}</p> {/* Display email */}
              <p>Phone: {customer.phone}</p> {/* Display phone number */}
            </div>
          </div>

          {/* Right column containing textarea and buttons */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* Description textarea field */}
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96" // Set height
            />

            {/* Button group */}
            <div className="flex gap-2">
              {/* Submit button */}
              <Button
                type="submit" // Submit the form
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>

              {/* Reset button */}
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)} // Reset form to initial values
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
