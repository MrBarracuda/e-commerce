"use client";

import Form from "@/components/composables/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { DatePicker } from "@/components/ui/date-picker";
import { FormTitle } from "../form-title";
import { userFormAction } from "./action";

import { userFormSchema } from "./validation";

type Props = {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export function UserForm({
  username,
  firstName,
  lastName,
  dateOfBirth,
}: Props) {
  const { toast } = useToast();
  const {
    form,
    resetFormAndAction,
    action: { execute, status },
  } = useHookFormAction(userFormAction, zodResolver(userFormSchema), {
    formProps: {
      mode: "onSubmit",
      values: {
        username,
        firstName,
        lastName,
        dateOfBirth,
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
    <div className="grid grid-cols-7" id="personal-information">
      <FormTitle
        title="User Information"
        subtitle="This
            requires to be filled out in order to"
      />

      <Form.Root
        form={form}
        action={execute}
        className="col-span-4 flex flex-col space-y-5 rounded-r-xl bg-primary-foreground p-6"
      >
        <Form.Field
          control={form.control}
          name="username"
          label="Username"
          disabled={status === "executing"}
          render={({ field }) => <Input {...field} />}
        />
        <div className="flex gap-x-4">
          <Form.Field
            control={form.control}
            name="firstName"
            label="First name"
            className="w-full"
            disabled={status === "executing"}
            render={({ field }) => <Input {...field} />}
          />
          <Form.Field
            control={form.control}
            name="lastName"
            label="Last name"
            className="w-full"
            disabled={status === "executing"}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <Form.Field
          control={form.control}
          name="dateOfBirth"
          label="Date of birth"
          className="flex flex-col"
          disabled={status === "executing"}
          render={({ field }) => <DatePicker {...field} />}
        />

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
      </Form.Root>
    </div>
  );
}
