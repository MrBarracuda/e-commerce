import { type UserSubscriptionPlan } from "@/types";
import { db } from "@/db";
import { isSubActive } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { freePlan, proPlan } from "@/config/subscription-plans";
import { subscriptionTable } from "@/db/schema";

export async function getUserSubscriptionPlan(
  userEmail: string,
): Promise<UserSubscriptionPlan> {
  const subscription = await db
    .select({
      subscriptionId: subscriptionTable.subscriptionId,
      customerId: subscriptionTable.customerId,
      priceId: subscriptionTable.priceId,
      expiresAt: subscriptionTable.expiresAt,
      // email: userTable.email,
      email: subscriptionTable.email,
    })
    .from(subscriptionTable)
    // .leftJoin(userTable, eq(subscriptionTable.email, userTable.email))
    .where(eq(subscriptionTable.email, userEmail))
    .limit(1)
    .execute()
    .then((result) => {
      // console.log("Query result:", result); // Log the result here for debugging
      return result[0];
    });

  if (!subscription?.email) {
    throw new Error("Subscription not found");
  }

  // const isPremium = Boolean(
  //   subscription.priceId && isSubActive(subscription.expiresAt),
  // );
  //
  // const plan = isPremium
  //   ? subscription.priceId === env.STRIPE_PREMIUM_PLUS_MONTHLY_PLAN_ID
  //     ? premiumPlusPlan
  //     : premiumPlan
  //   : null;

  const isPro = !!subscription.priceId && isSubActive(subscription.expiresAt);
  // subscription.expiresAt?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...subscription,
    expiresAt: subscription.expiresAt,
    isPro,
  };
}
