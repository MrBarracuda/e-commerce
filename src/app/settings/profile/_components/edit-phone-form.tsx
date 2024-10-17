"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Icons } from "@/components/icons";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const $EditPhone = z.object({
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
});

export function EditPhoneForm({ phone = "+380542458625" }) {
  const { toast } = useToast();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateUser, zodResolver($EditPhone), {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          phone: "",
        },
      },
      actionProps: {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Phone number updated successfully",
          });
          resetFormAndAction();
        },
        onError: () => {
          toast({
            title: "Something went wrong!",
            description: "Your update request failed. Please try again.",
            variant: "destructive",
          });
        },
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="grid grid-cols-7">
        <div className="col-span-3 space-y-2 rounded-l-xl bg-secondary">
          <div className="p-6">
            <h2 className="text-xl font-light">
              <span className="font-semibold">Phone number.</span> We will use
              this to send you tracking notifications, promotions, and other
              important information.
            </h2>
          </div>
        </div>

        <div className="col-span-4 flex flex-col justify-end space-y-5 rounded-r-xl bg-primary-foreground p-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only text-lg font-semibold">
                  Phone number
                </FormLabel>
                <FormControl>
                  <Input placeholder={phone} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-20" disabled={action.isExecuting}>
            {action.isExecuting ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
