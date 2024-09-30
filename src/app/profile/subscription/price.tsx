import { SubscriptionSection } from "@/app/profile/subscription/subscription-section";
import { getCurrentUser } from "@/lib/user";
import { getUserSubscriptionPlan } from "@/lib/subscription";

//TODO: move this component to components folder
export async function Price() {
  const user = await getCurrentUser();
  const subscriptionPlan = await getUserSubscriptionPlan(user?.email ?? "");

  if (!subscriptionPlan.isPro) {
    return false;
  }

  return (
    <section className="container mx-auto flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <SubscriptionSection />
    </section>
  );
}
