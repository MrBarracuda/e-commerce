"use client";

import { authAction } from "@/app/auth/auth-action";
import { useToast } from "@/hooks/use-toast";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "@/components/input-with-label";
import { Form } from "@/components/ui/form";
import LoginOauth from "@/app/auth/login-oauth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { userAuthSchema } from "@/lib/validations/auth";

export default function AuthForm() {
  const { toast } = useToast();
  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(authAction, zodResolver(userAuthSchema), {
      formProps: {
        mode: "onSubmit",
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

  const isLoading = form.formState.isLoading;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmitWithAction}
          className="flex flex-col space-y-4"
        >
          <InputWithLabel
            fieldTitle="Email"
            nameInSchema="email"
            readOnly={isLoading}
          />
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
          <LoginOauth />
        </form>
      </Form>
    </>
  );
}
