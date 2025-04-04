"use client"; // Ensures the component runs on the client side in a Next.js application.

import { useFormContext } from "react-hook-form"; // Imports the form context hook to access form state.

import {
  FormControl, // Wraps the input component for styling and control.
  FormField, // Connects an input field to React Hook Form.
  FormItem, // Groups form elements together.
  FormLabel, // Displays a label for the input field.
  FormMessage, // Shows validation error messages.
} from "@/components/ui/form"; // Imports custom UI components for form handling.

import {
  Select, // The main select dropdown component.
  SelectContent, // Container for the dropdown options.
  SelectItem, // Represents an individual option in the dropdown.
  SelectTrigger, // The button that opens the dropdown.
  SelectValue, // Displays the selected value.
} from "@/components/ui/select"; // Imports custom UI components for the select dropdown.

type DataObj = {
  id: string; // Unique identifier for the dropdown option.
  description: string; // Text that is displayed for each option.
};

type Props<S> = {
  fieldTitle: string; // Label text for the select field.
  nameInSchema: keyof S & string; // Field name in the form schema (ensures type safety).
  data: DataObj[]; // Array of available options for the select dropdown.
  className?: string; // Optional class name for additional styling.
};

export function SelectWithLabel<S>({
  fieldTitle, // The title displayed above the select dropdown.
  nameInSchema, // The key of the field in the form schema.
  data, // The list of selectable options.
  className, // Additional CSS class for styling.
}: Props<S>) {
  const form = useFormContext(); // Retrieves form context, allowing access to form control.

  return (
    <FormField
      control={form.control} // Connects the field to React Hook Form for state management.
      name={nameInSchema} // Specifies the field's name in the form schema.
      render={(
        { field } // Destructures field properties for easier access.
      ) => (
        <FormItem>
          {/* Wraps the form elements for better structuring */}
          <FormLabel
            className="text-base" // Applies base styling to the label.
            htmlFor={nameInSchema} // Links the label to the select field for accessibility.
          >
            {fieldTitle} {/* Displays the label text */}
          </FormLabel>
          <Select
            {...field} // Binds field properties (value, onChange, etc.) to the select component.
            onValueChange={field.onChange} // Updates the form state when an option is selected.
          >
            <FormControl>
              {/* Wrapper for styling and input management */}
              <SelectTrigger
                id={nameInSchema} // Associates the select trigger with the field name.
                className={`w-full max-w-xs ${className}`} // Ensures full width with optional custom styling.
              >
                <SelectValue placeholder="Select" />
                {/* Displays the selected option or placeholder */}
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {/* Container for the dropdown items */}
              {data.map(
                (
                  item // Maps through the data array to render dropdown options.
                ) => (
                  <SelectItem
                    key={`${nameInSchema}_${item.id}`} // Creates a unique key for each option.
                    value={item.id} // Assigns the value of the option.
                  >
                    {item.description} {/* Displays the text for the option */}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <FormMessage /> {/* Displays any validation messages */}
        </FormItem>
      )}
    />
  );
}
