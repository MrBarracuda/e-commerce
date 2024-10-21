"use client";

import { type UserSubscriptionPlan } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { type FormEvent, type HTMLAttributes, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormTitle } from "@/app/settings/profile/_components/form-title";

interface BillingFormProps extends HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe");

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json();

    if (session) {
      window.location.href = session.url;
    }
  }

  return (
    <div className="grid grid-cols-7" id="personal-information">
      <FormTitle
        title="Subscription Plan"
        subtitle={`You are currently on the ${subscriptionPlan.name} plan.`}
      />

      <form
        onSubmit={onSubmit}
        className="col-span-4 flex flex-col space-y-5 rounded-r-xl bg-primary-foreground p-6"
        {...props}
      >
        <div>
          <p>{subscriptionPlan.description}</p>
        </div>
        <button
          type="submit"
          className={cn(buttonVariants())}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
        </button>
        {subscriptionPlan.isPro ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {subscriptionPlan.expiresAt &&
              formatDate(subscriptionPlan.expiresAt)}
            .
          </p>
        ) : null}
      </form>
    </div>
  );
}
