import { env } from "@/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

const endpointSecret = env.STRIPE_ENDPOINT_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (error: any) {
    console.log(`❌ Error message: ${error.message}`);
    return new Response(
      `Webhook Error: ${error instanceof Error ? error.message : "Unknown error."}`,
      { status: 400 },
    );
  }

  // const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case "invoice.payment_succeeded":
      const invoicePaymentSucceeded = event.data.object;
      // const invoicePaymentSucceeded = await stripe.subscriptions.retrieve(
      //   session.subscription as string
      // )
      const userId = invoicePaymentSucceeded?.metadata?.userId;

      // TODO: fix issue metadata is empty
      // if (!userId) {
      //   return new Response("User id not found in invoice metadata.", {
      //     status: 404,
      //   });
      // }

      const periodEnd = invoicePaymentSucceeded.lines.data[0]?.period.end;

      if (!periodEnd) {
        return new Response("Period end not found in invoice.", {
          status: 404,
        });
      }
      const expires_at = new Date(periodEnd * 1000).toISOString();
      const customer_id = invoicePaymentSucceeded.customer as string;
      const subscription_id = invoicePaymentSucceeded.subscription as string;
      const email = invoicePaymentSucceeded.customer_email!;
      // const price_id = invoicePaymentSucceeded;
      const price_id =
        invoicePaymentSucceeded?.lines?.data?.[0]?.plan?.id ?? "";

      await onPaymentSucceeded(
        expires_at,
        customer_id,
        subscription_id,
        email,
        price_id,
      );

      break;

    case "customer.subscription.deleted":
      const customerSubscriptionDeleted = event.data.object;
      await onSubscriptionDelete(customerSubscriptionDeleted.id);
      break;

    default:
      console.warn(`"Unhandled event type ${event.type}"`);
  }
  return new Response(null, { status: 200 });
}

async function onPaymentSucceeded(
  expires_at: string,
  customer_id: string,
  subscription_id: string,
  email: string,
  price_id: string,
) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscription")
    .update({ expires_at, customer_id, subscription_id, price_id })
    .eq("email", email);

  if (error) {
    console.warn(`Error processing payment: ${error.message}`);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
}

async function onSubscriptionDelete(subscription_id: string) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscription")
    .update({ customer_id: null, subscription_id: null })
    .eq("subscription_id", subscription_id);

  if (error) {
    console.warn(`Error processing subscription delete: ${error.message}`);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
}
