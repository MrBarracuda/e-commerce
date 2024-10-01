import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { proPlan } from "@/config/subscription-plans";
import { getCurrentUser } from "@/lib/user";

const billingUrl = absoluteUrl("/dashboard/billing");

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    // const supabase = supabaseServer();
    // const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      return new Response(null, { status: 403 });
    }

    console.log("user / sets metadata.userId to user.id", user.id);
    const subscriptionPlan = await getUserSubscriptionPlan(user.email);

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.customerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.customerId,
        return_url: billingUrl,
      });

      return new Response(JSON.stringify({ url: stripeSession.url }));
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return new Response(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
