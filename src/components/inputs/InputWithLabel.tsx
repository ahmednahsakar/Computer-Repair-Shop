"use client"; // Ensures this component runs only on the client-side in Next.js

import { useFormContext } from "react-hook-form"; // Hook for accessing form context in React Hook Form

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Importing custom UI components for form elements

import { Input } from "@/components/ui/input"; // Importing Input component
import { InputHTMLAttributes } from "react"; // Importing HTML input attributes for extending component props

// Defining the props type for the InputWithLabel component
type Props<S> = {
  fieldTitle: string; // Label text for the input field
  nameInSchema: keyof S & string; // Field name in the form schema
  className?: string; // Optional CSS class for styling
} & InputHTMLAttributes<HTMLInputElement>; // Extends native input attributes

// Functional component that renders an input field with a label
export function InputWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext(); // Access the form context from react-hook-form

  return (
    <FormField
      control={form.control} // Connecting the field to the form context
      name={nameInSchema} // Field name as defined in the schema
      render={(
        { field } // Renders the field using React Hook Form
      ) => (
        <FormItem>
          <FormLabel
            className="text-base" // Styling for the label
            htmlFor={nameInSchema} // Associates label with input field
          >
            {fieldTitle} {/* Displays the label text */}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema} // Sets the input ID for accessibility
              className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yello-500 disabled:opacity-75 ${className}`}
              {...props} // Spreads additional input attributes
              {...field} // Connects field state from React Hook Form
            />
          </FormControl>
          <FormMessage /> {/* Displays validation error message if any */}
        </FormItem>
      )}
    />
  );
}
