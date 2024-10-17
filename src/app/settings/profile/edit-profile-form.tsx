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
import { updateUserSchema } from "@/lib/validations/auth";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Icons } from "@/components/icons";

export function EditProfileForm() {
  const { toast } = useToast();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateUser, zodResolver(updateUserSchema), {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          phone: "",
          username: "",
        },
      },
      actionProps: {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "User updated successfully",
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
      <form onSubmit={handleSubmitWithAction} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={action.isExecuting}>
          {action.isExecuting ? (
            <Icons.spinner className="mr-2 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
