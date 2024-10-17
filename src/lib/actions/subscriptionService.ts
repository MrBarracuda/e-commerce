"use server";

import { db } from "@/db";
import { subscriptionTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type UserSubscriptionPlan } from "@/types";
import { isSubActive } from "@/lib/utils";
import { freePlan, proPlan } from "@/config/subscription-plans";

export async function getSubscriptionByEmail(userEmail: string) {
  try {
    const subscription = await db.query.subscriptionTable.findFirst({
      where: eq(subscriptionTable.email, userEmail),
    });

    if (!subscription?.email) {
      throw new Error("Subscription not found");
    }

    return subscription;
  } catch (error) {
    console.error("Error during subscription query for email:", error);
    throw new Error(
      `Failed to fetch subscription for ${userEmail}. Please try again later.`,
    );
  }
}

export async function getUserSubscriptionPlan(
  userEmail: string,
): Promise<UserSubscriptionPlan> {
  const subscription = await getSubscriptionByEmail(userEmail);

  const isPro = !!subscription.priceId && isSubActive(subscription.expiresAt);
  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...subscription,
    expiresAt: subscription.expiresAt,
    isPro,
  };
}
