"use client";

import { authAction } from "@/app/auth/action";
import { useToast } from "@/hooks/use-toast";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { userAuthSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { LoginOauth } from "./login-oauth";

export function AuthForm() {
  const { toast } = useToast();
  const {
    form,
    handleSubmitWithAction,
    resetFormAndAction,
    action: { status },
  } = useHookFormAction(authAction, zodResolver(userAuthSchema), {
    formProps: {
      mode: "onSubmit",
      defaultValues: { email: "" },
    },
    actionProps: {
      onSuccess: () => {
        toast({
          title: "Check your email",
          description:
            "We sent you a login link. Be sure to check your spam too.",
        });
        resetFormAndAction();
      },
      onError: () => {
        toast({
          title: "Something went wrong.",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  // const isLoading = form.formState.isLoading;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  disabled={status === "executing"}
                  readOnly={status === "executing"}
                  autoCorrect="off"
                  autoCapitalize="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className={cn(buttonVariants())}
          disabled={status === "executing"}
        >
          {status === "executing" && (
            <Icons.spinner className="mr-2 animate-spin" />
          )}
          Sign In with Email
        </button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <LoginOauth />
      </form>
    </Form>
  );
}
