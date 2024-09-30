"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  placeholder?: string;
  labelLeft?: boolean;
  readOnly?: boolean;
};

export function InputWithLabel({
  fieldTitle,
  nameInSchema,
  placeholder,
  labelLeft,
  readOnly,
}: Props) {
  const form = useFormContext();

  const fieldTitleNoSpaces = fieldTitle.replaceAll(" ", "-");

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={labelLeft ? "flex w-full items-center gap-2" : ""}>
          <FormLabel
            className={`text-base ${labelLeft ? "mt-2 w-1/3" : ""}`}
            htmlFor={fieldTitleNoSpaces}
          >
            {fieldTitle}
          </FormLabel>

          <div
            className={`flex items-center gap-2 ${labelLeft ? "w-2/3" : "w-full max-w-xs"}`}
          >
            <div className="flex w-full max-w-xs items-center rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <FormControl>
                <Input
                  {...field}
                  id={fieldTitleNoSpaces}
                  className="w-full max-w-xs"
                  placeholder={placeholder || fieldTitle}
                  readOnly={readOnly}
                  disabled={readOnly}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
