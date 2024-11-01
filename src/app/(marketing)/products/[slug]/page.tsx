import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { env } from "@/env";
import { getProductBySlug } from "@/lib/actions/product";
import { CheckoutForm } from "@/app/(marketing)/_components/checkout-form";
import { getCurrentUserId } from "@/data-access/auth";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { QuantityInput } from "@/components/quantity-input";
import { ProductDetailsForm } from "./form";

type ProductDetailsProps = {
  params: {
    slug: string;
  };
};

// const stripe = new Stripe(env.STRIPE_SK);

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: Number(data?.price) * 100,
  //   currency: "USD",
  //   payment_method_types: ["card"],
  //   // customer_email: userEmail,
  //   metadata: {
  //     productId: data.id,
  //   },
  // });

  // if (paymentIntent.client_secret === null) {
  //   throw new Error("Payment failed");
  // }

  // return (
  //   <Container>
  //     <CheckoutForm
  //       product={data}
  //       clientSecret={paymentIntent.client_secret}
  //       userId={id}
  //     />
  //   </Container>
  // );

  return (
    <Container>
      <div className="flex flex-wrap">
        <Image
          height={256}
          width={256}
          alt="Perfume"
          className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
          src="https://dummyimage.com/400x400"
        />
        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
          <div className="">
            <h1 className="mb-1 text-3xl font-medium">{product.title}</h1>
            <h2 className="mb-8 text-sm font-light tracking-widest">
              {product.flavorProfile}
            </h2>
            <p className="text-justify font-light leading-normal tracking-tight">
              {product.description}
            </p>
          </div>
          <Separator className="my-6" />
          <ProductDetailsForm skus={product.skus} />
        </div>
      </div>
    </Container>
  );
}
