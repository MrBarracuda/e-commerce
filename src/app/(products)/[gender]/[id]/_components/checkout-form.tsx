"use client";

import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type Product } from "@/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type FormEvent, useState } from "react";
import { getStripe } from "@/lib/get-stripe-js";
import { userOrderExists } from "@/lib/actions/order";

type CheckoutFormProps = {
  product: Product;
  clientSecret: string;
  userId: string;
};

export function CheckoutForm({
  product,
  clientSecret,
  userId,
}: CheckoutFormProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative aspect-video w-1/3 flex-shrink-0">
          <Image
            fill
            src="https://dummyimage.com/400x400"
            alt={product.name ?? ""}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-xl">${product.price}</div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={getStripe()}>
        <Form
          price={product.price ?? ""}
          clientSecret={clientSecret}
          productId={product.id}
          userId={userId}
        />
      </Elements>
    </div>
  );
}

function Form({
  price,
  productId,
  userId,
}: {
  price: string;
  clientSecret?: string;
  productId: string;
  userId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (stripe === null || elements === null) {
      return;
    }

    setIsLoading(true);

    const orderExists = await userOrderExists(userId, productId);

    if (orderExists) {
      setErrorMessage("You have already placed an order");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000",
          shipping: {
            address: {
              city: "San Francisco",
              country: "US",
              line1: "123 Main St",
              postal_code: "94105",
              state: "CA",
            },
            name: "John Doe",
          },
          receipt_email: "1dima99999@gmail.com",
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(`stripe error: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } catch (error) {
      console.error("Error during payment confirmation:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          {/*<LinkAuthenticationElement />*/}
          {/*<AddressElement options={{ mode: "shipping" }} />*/}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={stripe === null || elements === null || isLoading}
          >
            {isLoading ? "Loading..." : `Pay ${price}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
