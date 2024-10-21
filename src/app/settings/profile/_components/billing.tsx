import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/actions/subscriptionService";
import { BillingForm } from "@/app/settings/profile/_components/edit-billing-form";

export async function BillingNew() {
  //TODO: change to use user id, remove hardcoded email
  const subscriptionPlan = await getUserSubscriptionPlan("1dima9999@gmail.com");

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.subscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.subscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <BillingForm
      subscriptionPlan={{
        ...subscriptionPlan,
        isCanceled,
      }}
    />
  );
}
