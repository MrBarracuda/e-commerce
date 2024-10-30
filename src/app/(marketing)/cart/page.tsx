import Container from "@/components/container";
import { CheckoutForm } from "@/app/(marketing)/_components/checkout-form";
import { getProductBySlug } from "@/lib/actions/product";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { env } from "@/env";

// const stripe = loadStripe()

const stripe = new Stripe(env.STRIPE_SK);

export default async function Cart() {
  const product = await getProductBySlug("catalyst-decaf-blend");

  if (!product) {
    return <div>No product found</div>;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(999) * 100,
    currency: "USD",
    payment_method_types: ["card"],
    // customer_email: userEmail,
    metadata: {
      productId: product.id,
    },
  });

  if (paymentIntent.client_secret === null) {
    throw new Error("Payment failed");
  }

  return (
    <Container>
      <div className="flex h-[77vh]">
        {/*<h2 className="text-xl font-semibold tracking-tight">Cart</h2>*/}
        <div className="grid grid-cols-1">
          {/*<div className="h-screen w-screen bg-amber-400">1</div>*/}

          {/*<div className="h-screen w-screen bg-red-400">2</div>*/}

          <CheckoutForm
            product={product}
            clientSecret={paymentIntent.client_secret}
            userId="asd"
          />
        </div>
      </div>
    </Container>
  );
}
