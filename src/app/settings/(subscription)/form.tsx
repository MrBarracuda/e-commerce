import { type UserSubscriptionPlan } from "@/types";
import { formatDate } from "@/lib/utils";
import { FormTitle } from "../form-title";
import { SubscribeButton } from "./subscribeButton";

type BillingFormProps = {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
};

export function BillingFormNew({ subscriptionPlan }: BillingFormProps) {
  return (
    <div className="grid grid-cols-7" id="subscription">
      <FormTitle
        title="Subscription Plan"
        subtitle={`You are currently on the ${subscriptionPlan.name} plan`}
      />

      <div className="col-span-4 flex flex-col space-y-5 rounded-r-xl bg-primary-foreground p-6">
        <div>
          <p>{subscriptionPlan.description}</p>
        </div>
        <SubscribeButton isPro={subscriptionPlan.isPro} />
        {subscriptionPlan.isPro ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {subscriptionPlan.expiresAt &&
              formatDate(subscriptionPlan.expiresAt)}
            .
          </p>
        ) : null}
      </div>
    </div>
  );
}
