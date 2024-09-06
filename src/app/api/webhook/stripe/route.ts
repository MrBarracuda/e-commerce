import Stripe from "stripe";
import { env } from "@/env";
import { buffer } from "node:stream/consumers";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/utils/supabase/admin";
import { type NextApiRequest } from "next";

const endpointSecret = env.STRIPE_ENDPOINT_SECRET;
const stripe = new Stripe(env.STRIPE_SK);

export async function POST(req: NextApiRequest) {
  const rawBody = await buffer(req.body);

  try {
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
        const supabase = await supabaseAdmin();
        const expires_at = new Date(
          result.lines.data[0]?.period.end! * 1000,
        ).toISOString();
        const customer_id = result.customer as string;
        const subscription_id = result.subscription as string;
        const email = result.customer_email!;

        const { error } = await supabase
          .from("subscription")
          .update({ expires_at, customer_id, subscription_id })
          .eq("email", email);

        if (error) {
          console.log(error);
          return Response.json({ error: `Webhook error:  ${error.message}` });
        }

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
