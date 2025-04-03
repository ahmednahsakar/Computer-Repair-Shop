// Import functions from drizzle-zod to create validation schemas
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Import the tickets table schema from the database schema file
import { tickets } from "@/db/schema";

// Import Zod for additional schema validation
import { z } from "zod";

// Create a validation schema for inserting new ticket records
export const insertTicketSchema = createInsertSchema(tickets, {
  // Allow 'id' to be either a number or the string "(New)" for new tickets
  id: z.union([z.number(), z.literal("(New)")]),
  // Ensure title is not empty
  title: (schema) => schema.min(1, "Title is required"),
  // Ensure description is not empty
  description: (schema) => schema.min(1, "Description is required"),
  // Ensure 'tech' is a valid email address
  tech: (schema) => schema.email("Invalid email address"),
});

// Create a validation schema for selecting existing ticket records
export const selectTicketSchema = createSelectSchema(tickets);

// Define TypeScript types for inserting and selecting ticket records
export type insertTicketSchemaType = typeof insertTicketSchema._type;
export type selectTicketSchemaType = typeof selectTicketSchema._type;
