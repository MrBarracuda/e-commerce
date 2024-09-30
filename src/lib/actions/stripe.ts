"use server";

import Stripe from "stripe";
import { env } from "@/env";

const stripe = new Stripe(env.STRIPE_SK);

export async function checkout(
  email: string,
  priceId: string,
  redirectTo: string,
) {
  const response = await stripe.checkout.sessions.create({
    // TODO: redirect to congratulations page on success
    success_url: redirectTo || env.NEXT_PUBLIC_APP_URL,
    cancel_url: env.NEXT_PUBLIC_APP_URL,
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
  });

  return JSON.stringify(response);
}

export async function manageBilling(customer_id: string) {
  const response = await stripe.billingPortal.sessions.create({
    customer: customer_id,
    return_url: env.NEXT_PUBLIC_APP_URL,
  });

  return JSON.stringify(response);
}
