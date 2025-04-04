"use client"; // Enables client-side rendering in a Next.js application

import { useFormContext } from "react-hook-form"; // Imports useFormContext to access form state and methods

import {
  FormControl, // UI component that wraps form controls
  FormField, // Component for handling form fields within react-hook-form
  FormItem, // Wrapper for form items, useful for styling
  FormLabel, // Component for rendering form labels
  FormMessage, // Displays validation messages
} from "@/components/ui/form"; // Imports form-related UI components from the custom form library

import { Checkbox } from "@/components/ui/checkbox"; // Imports the Checkbox component from the UI library

// Defines a generic type Props<S> for the component, allowing it to work with various schemas
type Props<S> = {
  fieldTitle: string; // The label for the checkbox
  nameInSchema: keyof S & string; // The name of the field in the schema
  message: string; // A message displayed next to the checkbox
};

// CheckboxWithLabel component: A reusable checkbox input field with a label and validation support
export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
}: Props<S>) {
  const form = useFormContext(); // Retrieves the form context to access form state and control

  return (
    <FormField
      control={form.control} // Passes the form control object for managing form state
      name={nameInSchema} // Binds the field name to the form state
      render={(
        { field } // Renders the checkbox with appropriate handlers and values
      ) => (
        <FormItem className="w-full flex items-center gap-2">
          <FormLabel
            className="text-base w-1/3 mt-2"
            htmlFor={nameInSchema} // Associates the label with the checkbox for accessibility
          >
            {fieldTitle} {/* Displays the field title as the label */}
          </FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              {/* Wrapper for form controls */}
              <Checkbox
                id={nameInSchema} // Sets the checkbox ID for accessibility
                {...field} // Spreads field properties from react-hook-form
                checked={field.value} // Binds checkbox state to form value
                onCheckedChange={field.onChange} // Updates form state on change
              />
            </FormControl>
            {message} {/* Displays the provided message next to the checkbox */}
          </div>
          <FormMessage /> {/* Displays validation messages if any */}
        </FormItem>
      )}
    />
  );
}
