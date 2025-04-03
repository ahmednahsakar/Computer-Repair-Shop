"use client";

// Import necessary libraries and components
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Import Zod schemas and types for customer validation
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customer";

/**
 * Props type definition for the CustomerForm component.
 */
type Props = {
  customer?: selectCustomerSchemaType;
};

/**
 * CustomerForm component for creating or editing customer records.
 * Uses react-hook-form for form management and validation via Zod.
 */
export default function CustomerForm({ customer }: Props) {
  // Define default values for the form, using existing customer data if available
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
  };

  // Initialize form with react-hook-form and apply validation schema
  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur", // Trigger validation on blur
    resolver: zodResolver(insertCustomerSchema), // Apply Zod validation schema
    defaultValues,
  });

  /**
   * Handles form submission.
   */
  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data); // Log submitted data (replace with actual submit logic)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer Form
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
