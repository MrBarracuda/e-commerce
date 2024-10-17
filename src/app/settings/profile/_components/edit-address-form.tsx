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
import { updateAddress } from "@/lib/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Icons } from "@/components/icons";
import { $EditAddress } from "@/lib/validations/auth";

export function EditAddressForm() {
  const { toast } = useToast();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateAddress, zodResolver($EditAddress), {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          name: "",
          country: "",
          city: "",
          street: "",
          postalCode: "",
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
              <span className="font-semibold">Address Information. </span>This
              requires to be filled out in order to place orders.
            </h2>
          </div>
        </div>

        <div className="col-span-4 flex flex-col space-y-5 rounded-r-xl bg-primary-foreground p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-semibold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-semibold">Country</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-semibold">City</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row space-x-5">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-md font-semibold">
                    Street
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-md font-semibold">
                    Postal code
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="ml-auto w-1/3"
            disabled={action.isExecuting}
          >
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
