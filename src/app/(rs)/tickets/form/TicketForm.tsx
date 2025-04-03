"use client";

// Import necessary libraries and components
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Import Zod schemas and types for customer and ticket validation
import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from "@/zod-schemas/ticket";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";

/**
 * Props for the TicketForm component.
 */
type Props = {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
};

/**
 * TicketForm component for creating or editing a support ticket.
 */
export default function TicketForm({ customer, ticket }: Props) {
  /**
   * Default values for the form, pre-filled if editing an existing ticket.
   */
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)", // Default to "(New)" for new tickets
    customerId: ticket?.customerId ?? customer.id, // Associate ticket with the given customer
    title: ticket?.title ?? "", // Default empty title
    description: ticket?.description ?? "", // Default empty description
    completed: ticket?.completed ?? false, // Default to incomplete
    tech: ticket?.tech ?? "new-ticket@example.com", // Default tech email
  };

  /**
   * React Hook Form setup with Zod schema validation.
   */
  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur", // Validate on blur event
    resolver: zodResolver(insertTicketSchema), // Use Zod schema for validation
    defaultValues,
  });

  /**
   * Handles form submission.
   */
  async function submitForm(data: insertTicketSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? `Edit Ticket # ${ticket.id}` : "New Ticket Form"}
        </h2>
      </div>

      {/* Form Component */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          {/* Debugging - Show form values as JSON */}
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
}
