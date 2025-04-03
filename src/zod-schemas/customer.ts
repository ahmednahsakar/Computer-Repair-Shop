// Import functions from drizzle-zod to create schemas for validation
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Import the customers table schema from the database schema file
import { customers } from "@/db/schema";

// Create a validation schema for inserting new customer records
export const insertCustomerSchema = createInsertSchema(customers, {
  // Ensure first name is not empty
  firstName: (schema) => schema.min(1, "First name is required"),
  // Ensure last name is not empty
  lastName: (schema) => schema.min(1, "Last name is required"),
  // Ensure address1 is not empty
  address1: (schema) => schema.min(1, "Address is required"),
  // Ensure city is not empty
  city: (schema) => schema.min(1, "City is required"),
  // Ensure state is exactly 2 characters (e.g., "NY", "CA")
  state: (schema) => schema.length(2, "State must be exactly 2 characters"),
  // Validate email format
  email: (schema) => schema.email("Invalid email address"),
  // Validate ZIP code format (5 digits or 5 digits followed by a hyphen and 4 digits)
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),
  // Validate phone number format (XXX-XXX-XXXX)
  phone: (schema) =>
    schema.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
});

// Create a validation schema for selecting existing customer records
export const selectCustomerSchema = createSelectSchema(customers);

// Define TypeScript types for inserting and selecting customer records
export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
