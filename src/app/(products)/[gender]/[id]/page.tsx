import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/app/(products)/fetchProducts";
import type { Product } from "@/types";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { env } from "@/env";
import { CheckoutForm } from "@/app/(products)/[gender]/[id]/_components/checkout-form";
import { getCurrentUser } from "@/lib/user";

type ProductDetailsProps = {
  params: {
    id: string;
    gender: string;
  };
};

const stripe = new Stripe(env.STRIPE_SK);

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const response = await fetchProducts(params.id);
  // const user = await getCurrentUser();

  // if (!user) {
  //   return false;
  // }

  if (!response.ok) {
    return <div>Error fetching product</div>;
  }

  const data = (await response.json()) as Product;

  if (!data) {
    return notFound();
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(data.price) * 100,
    currency: "USD",
    payment_method_types: ["card"],
    // customer_email: userEmail,
    metadata: {
      productId: data.id,
    },
  });

  if (paymentIntent.client_secret === null) {
    throw new Error("Payment failed");
  }

  // if (true) {
  //   return (
  //     <CheckoutForm
  //       product={data}
  //       clientSecret={paymentIntent.client_secret}
  //       userId={user.id}
  //     />
  //   );
  // }

  return (
    <>
      <section className="overflow-hidden">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <Image
              height={256}
              width={256}
              alt="Perfume"
              className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
              src="https://dummyimage.com/400x400"
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="text-sm font-light tracking-widest">
                {data.name}
              </h2>
              <h1 className="mb-1 text-3xl font-medium">{data.description}</h1>
              <p className="leading-relaxed">
                Experience the allure of our Mystic Oud fragrance, blending
                exotic spices with rich oud to create an unforgettable scent.
                Perfect for those seeking a unique and long-lasting aroma.
              </p>
              <div className="mb-5 mt-6 flex items-center border-b-2 pb-5">
                <div className="flex items-center">
                  <span className="mr-3">Size</span>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex">
                <span className="title-font text-2xl font-medium">
                  ${data.price}
                </span>
                <Button className="ml-auto">Add to Cart</Button>
                {/*<button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full p-0 focus:outline-none">*/}
                {/*  <Icons.heart className="h-5 w-5" />*/}
                {/*</button>*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
