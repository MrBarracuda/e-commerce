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

const $EditUsername = z.object({
  username: z.string().min(3),
});

export function EditUsernameForm({ username }: { username: string }) {
  const { toast } = useToast();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateUser, zodResolver($EditUsername), {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          username: "",
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
          <div className="p-8">
            <h2 className="text-xl font-light">
              Your username is your unique identifier on the platform.
            </h2>
          </div>
        </div>

        <div className="col-span-4 flex flex-col items-end justify-end space-y-5 rounded-r-xl bg-primary-foreground p-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">User name</FormLabel>
                <FormControl>
                  <Input placeholder={username} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
