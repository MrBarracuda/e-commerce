"use server";

import { type UserSubscriptionPlan } from "@/types";
import { isSubActive } from "@/lib/utils";
import { freePlan, proPlan } from "@/config/subscription-plans";
import { getSubscription } from "@/data-access/subscription";

export async function getUserSubscriptionPlan(
  userEmail: string,
): Promise<UserSubscriptionPlan> {
  const subscription = await getSubscription(userEmail);

  if (!subscription) {
    throw new Error("No subscription found");
  }

  const isPro = !!subscription.priceId && isSubActive(subscription.expiresAt);
  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...subscription,
    expiresAt: subscription.expiresAt,
    isPro,
  };
}
