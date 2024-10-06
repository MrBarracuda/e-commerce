import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { BillingForm } from "@/components/billing-form";
import { getCurrentUser } from "@/lib/user";
import { Wrapper } from "@/components/wrapper";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.email ?? "");

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.subscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.subscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <Wrapper className="py-14">
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </Wrapper>
  );
}
