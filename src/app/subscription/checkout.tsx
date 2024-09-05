"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { checkout } from "@/lib/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {Icons} from "@/components/ui/icons";

export function Checkout({ priceId }: { priceId: string }) {
  const { data: user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (user?.id) {
      setIsLoading(true);

      // TODO: Redirect a user on "success" page on subscrition
      const data = JSON.parse(
        await checkout(user.email, priceId, "http://localhost:3000/"),
      );
      // const data = JSON.parse(response);
      const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PK);

      const result = await stripe?.redirectToCheckout({ sessionId: data.id });

      if (result?.error) {
        setIsLoading(false);
        // TODO: Add a toast to display errors
        console.log("failed to check out");
      }
    } else {
      router.push("/auth");
      // router.push("/auth?next=" + window.location.pathname);
    }
    setIsLoading(false);
  };

  return (
    // <div className="flex">
    <Button className={cn("w-full")} disabled={isLoading} onClick={handleSubscription}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : "Getting Started"}
    </Button>
    // </div>
  );
}
