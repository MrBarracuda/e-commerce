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
    // TODO: change default url to env variable
    success_url: redirectTo || "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
  });

  return JSON.stringify(response);
}
