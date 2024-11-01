/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { env } from "@/env";

let stripePromise: Promise<Stripe | null> | undefined;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PK);

  return stripePromise;
}
