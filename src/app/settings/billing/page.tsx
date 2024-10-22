import { stripe } from "@/lib/stripe";
import { BillingForm } from "@/components/billing-form";
import { Wrapper } from "@/components/wrapper";
import { getUserSubscriptionPlan } from "@/lib/actions/subscriptionService";
import { getUser } from "@/data-access/user";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getUser();

  if (!user) {
    return false;
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.email);

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
