"use client";

import { useTransition } from "react";

import { subscribeAction } from "./action";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

export function SubscribeButton({ isPro }: { isPro: boolean }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  async function handleSubscribeButton() {
    startTransition(async () => {
      const url = await subscribeAction();

      if (!url) {
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      } else {
        window.location.href = url;
      }
    });
  }

  return (
    <button
      className={cn(buttonVariants())}
      disabled={isPending}
      onClick={handleSubscribeButton}
    >
      {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {isPro ? "Manage Subscription" : "Upgrade to PRO"}
    </button>
  );
}
