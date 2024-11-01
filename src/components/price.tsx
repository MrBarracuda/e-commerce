import { getUserSubscriptionPlan } from "@/lib/actions/subscriptionService";
import { getUser } from "@/data-access/user";
import { SubscriptionSection } from "@/components/subscription-section";

export async function Price() {
  // const user = await getUser();
  //
  // if (!user) {
  //   return false;
  // }
  //
  // const subscriptionPlan = await getUserSubscriptionPlan(user.email);
  //
  // if (subscriptionPlan.isPro) {
  //   return false;
  // }

  return (
    <section className="container mx-auto flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <SubscriptionSection />
    </section>
  );
}
