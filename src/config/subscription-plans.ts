import { type SubscriptionPlan } from "@/types";
import { env } from "@/env";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  stripePriceId: "",
  description:
    "Enjoy our basic services with access to select perfumes and occasional offers.",
  benefits: ["access to select perfumes", "occasional offers"],
  amount: 0,
};

export const proPlan: SubscriptionPlan = {
  name: "Pro",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID ?? "",
  description:
    "Get exclusive offers, faster delivery, and a free tester each month.",
  benefits: ["faster delivery", "10% discount", "free monthly testers"],
  amount: 15,
};
