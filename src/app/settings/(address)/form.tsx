"use client";

import Form from "@/components/composables/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

import { addressFormSchema } from "./validation";
import { addressFormAction } from "./action";
import { FormTitle } from "../form-title";

type Props = {
  initialValues: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
};

export function AddressForm({ initialValues }: Props) {
  const { toast } = useToast();
  const {
    form,
    resetFormAndAction,
    action: { execute, status },
  } = useHookFormAction(addressFormAction, zodResolver(addressFormSchema), {
    formProps: {
      mode: "onSubmit",
      values: {
        ...initialValues,
      },
    },
    actionProps: {
      onSuccess: () => {
        toast({
          title: "Address information updated.",
          description:
            "You can check your address information on your profile page.",
        });
        resetFormAndAction();
      },
      onError: () => {
        toast({
          title: "Something went wrong.",
          description: "Your address information could not be updated.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <div className="grid grid-cols-7" id="address">
      <FormTitle
        title="Address Information"
        subtitle="This
            requires to be filled out in order to place orders"
      />

      <Form.Root
        form={form}
        action={execute}
        className="col-span-4 flex flex-col space-y-5 rounded-r-xl bg-primary-foreground p-6"
      >
        <Form.Field
          control={form.control}
          name="name"
          label="Name"
          disabled={status === "executing"}
          render={({ field }) => <Input {...field} />}
        />
        <div className="flex gap-x-4">
          <Form.Field
            control={form.control}
            name="addressLine1"
            label="Address Line 1"
            className="w-full"
            disabled={status === "executing"}
            render={({ field }) => <Input {...field} />}
          />
          <Form.Field
            control={form.control}
            name="addressLine2"
            label="Address Line 2"
            className="w-full"
            disabled={status === "executing"}
            render={({ field }) => <Input required={false} {...field} />}
          />
        </div>
        <Form.Field
          control={form.control}
          name="country"
          label="Country"
          disabled={status === "executing"}
          render={({ field }) => <Input {...field} />}
        />
        <div className="flex gap-x-4">
          <Form.Field
            control={form.control}
            name="city"
            label="City"
            className="w-full"
            disabled={status === "executing"}
            render={({ field }) => <Input {...field} />}
          />
          <Form.Field
            control={form.control}
            name="postalCode"
            label="Postal Code"
            className="w-full"
            disabled={status === "executing"}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <Form.Field
          control={form.control}
          name="phone"
          label="Phone"
          disabled={status === "executing"}
          render={({ field }) => <Input type="number" {...field} />}
        />
        <div className="flex justify-end gap-x-4">
          <Button
            variant="secondary"
            className="w-1/6"
            disabled={status === "executing"}
            type="reset"
            onClick={resetFormAndAction}
          >
            Reset
          </Button>
          <Button
            className="w-1/6"
            disabled={status === "executing"}
            type="submit"
          >
            {status === "executing" ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </Form.Root>
    </div>
  );
}
