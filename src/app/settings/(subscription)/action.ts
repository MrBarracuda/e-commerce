"use server";

import { stripe } from "@/lib/stripe";
import { getCurrentUserId } from "@/data-access/auth";
import { proPlan } from "@/config/subscription-plans";
import { absoluteUrl, handleError } from "@/lib/utils";
import { getUserSubscriptionPlan } from "@/lib/actions/subscriptionService";

const billingUrl = absoluteUrl("/settings/profile");

export async function subscribeAction() {
  try {
    const id = await getCurrentUserId();

    const subscriptionPlan = await getUserSubscriptionPlan(
      "1dima9999@gmail.com",
    );

    if (subscriptionPlan.isPro && subscriptionPlan.customerId) {
      const { url } = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.customerId,
        return_url: billingUrl,
      });

      return url;
    }

    const { url } = await stripe.checkout.sessions.create({
      // customer_email: user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: id,
      },
      mode: "subscription",
      success_url: billingUrl,
      cancel_url: billingUrl,
      billing_address_collection: "auto",
    });

    return url ?? undefined;
  } catch (err) {
    handleError(err);
  }
}
