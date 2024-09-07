import Stripe from "stripe";
import { env } from "@/env";
// import { buffer } from "node:stream/consumers";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/utils/supabase/admin";
import { buffer } from "stream/consumers";

const endpointSecret = env.STRIPE_ENDPOINT_SECRET;
const stripe = new Stripe(env.STRIPE_SK);

// type My = Record<string, Buffer>

export async function POST(req: Request) {
  // const { body } = await req.json() as My;
  try {
    const rawBody = await buffer(req.body);
    const signature = headers().get("stripe-signature");
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        endpointSecret,
      );
    } catch (error: any) {
      return Response.json({
        error: `Webhook returned with status code ${error?.statusCode}`,
      });
    }
    switch (event.type) {
      case "invoice.payment_succeeded":
        const result = event.data.object;

        const expires_at = new Date(
          result.lines.data[0]?.period.end! * 1000,
        ).toISOString();
        const customer_id = result.customer as string;
        const subscription_id = result.subscription as string;
        const email = result.customer_email!;

        await onPaymentSucceeded(expires_at, customer_id, subscription_id, email);

        break;

      case "customer.subscription.deleted":
        const result1 = event.data.object;
        console.log(result1);
        await onSubscriptionDelete(result1.id);
        break;

      default:
        console.log(`"Unhandled event type ${event.type}"`);
    }
    return Response.json({});
  } catch (error: any) {
    return Response.json({
      error: `Webhook error with error at the last catch ${error?.statusCode}`,
    });
  }
}

async function onPaymentSucceeded(expires_at: string, customer_id: string, subscription_id: string, email: string) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscription")
    .update({ expires_at, customer_id, subscription_id })
    .eq("email", email);

  if (error) {
    console.log(error);
    return Response.json({ error: `Webhook error:  ${error.message}` });
  }
}

async function onSubscriptionDelete(subscription_id: string) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscription")
    .update({ customer_id: null, subscription_id: null })
    .eq("subscription_id", subscription_id);

  if (error) {
    console.log(error);
    return Response.json({ error: `Webhook error:  ${error.message}` });
  }
}