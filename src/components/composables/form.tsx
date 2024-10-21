"use client";

import {
  Form as Form_,
  FormControl as FormControl_,
  FormDescription as FormDescription_,
  FormField as FormField_,
  FormItem as FormItem_,
  FormLabel as FormLabel_,
  FormMessage as FormMessage_,
} from "@/components/ui/form";
import { type FormHTMLAttributes } from "react";
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type FormRootProps<T extends FieldValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "action"
> & {
  form: UseFormReturn<T>;
  action?: (data: T) => void | undefined;
};

function FormRoot<T extends FieldValues>(props: FormRootProps<T>) {
  const { form, action, children, className, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmitAction: () => void = form.handleSubmit((data: T) => {
    if (action) {
      action(data);
    }
  });

  return (
    <Form_<T> {...form}>
      <form action={handleSubmitAction} className={className} {...rest}>
        {children}
      </form>
    </Form_>
  );
}

type CustomFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> & {
  label: string;
  description?: string;
  className?: string;
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CustomFormFieldProps<TFieldValues, TName>,
) => {
  const { label, description, render, className, ...rest } = props;
  return (
    <FormField_
      {...rest}
      render={(field) => (
        <FormItem_ className={className ?? ""}>
          <FormLabel_>{label}</FormLabel_>
          <FormControl_>{render(field)}</FormControl_>
          {description && <FormDescription_>{description}</FormDescription_>}
          <FormMessage_ />
        </FormItem_>
      )}
    />
  );
};

function FormHeader({
  title,
  removeBackButton = false,
  children,
}: {
  title?: string;
  removeBackButton?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="inline-flex items-center gap-2">
      {!removeBackButton && (
        <Button
          onClick={() =>
            router.push(pathname?.split("/").slice(0, -1).join("/"))
          }
          type="button"
          aria-label="Back"
          variant="outline"
          size="icon"
          className="h-7 w-7"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      )}
      {title && <legend className="text-lg font-bold">{title}</legend>}
      {children}
    </div>
  );
}

export const Form = {
  Root: FormRoot,
  Header: FormHeader,
  Field: FormField,
};

export default Form;
