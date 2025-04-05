// Ensures this component runs on the client side (Next.js directive)
"use client";

// Import the useFormContext hook from React Hook Form to manage form state
import { useFormContext } from "react-hook-form";

// Import custom UI components for form elements
import {
  FormControl, // Wrapper for form input components
  FormField, // Connects input field to form control
  FormItem, // Container for form fields, labels, and messages
  FormLabel, // Styled label component
  FormMessage, // Displays validation error messages
} from "@/components/ui/form";

// Import a custom Textarea component for consistent styling
import { Textarea } from "@/components/ui/textarea";

// Import TypeScript's type definition for standard textarea attributes
import { TextareaHTMLAttributes } from "react";

// Define the props for the component using generics
type Props<S> = {
  fieldTitle: string; // Label text for the textarea
  nameInSchema: keyof S & string; // Field name in the form schema (ensures type safety)
  className?: string; // Optional custom CSS class
} & TextareaHTMLAttributes<HTMLTextAreaElement>; // Allows standard textarea attributes

// Define the TextAreaWithLabel component, making it generic for flexibility
export function TextAreaWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext(); // Get form context to manage form state

  return (
    <FormField
      control={form.control} // Connects field to React Hook Form
      name={nameInSchema} // Specifies the field name in the schema
      render={(
        { field } // Uses render prop pattern to dynamically assign field properties
      ) => (
        <FormItem>
          {/* Wrapper for the entire form item */}
          <FormLabel
            className="text-base mb-2" // Applies text styling and spacing
            htmlFor={nameInSchema} // Links label to the textarea
          >
            {fieldTitle} {/* Displays the label text */}
          </FormLabel>
          <FormControl>
            {/* Wrapper for the textarea input */}
            <Textarea
              id={nameInSchema} // Unique identifier for accessibility
              className={`disabled:text-blue-500 dark:disabled:text-yello-500 disabled:opacity-75 ${className}`} // Applies custom CSS class if provided
              {...props} // Passes additional textarea attributes
              {...field} // Connects the field to React Hook Form (manages value, onChange, etc.)
            />
          </FormControl>
          <FormMessage /> {/* Displays validation errors if any */}
        </FormItem>
      )}
    />
  );
}
