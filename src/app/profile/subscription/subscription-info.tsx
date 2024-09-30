// type User = {
//   avatar: string | null,
//   created_at: string,
//   email: string,
//   first_name: string | null,
//   id: string,
//   password: string | null,
//   phone_number: string | null,
//   username: string,
//   subscription: {
//     email: string,
//     created_at: string,
//     expires_at: string,
//     customer_id: string,
//     subscription_id: string,
//   }
// };

import { Button } from "@/components/ui/button";
import { manageBilling } from "@/lib/actions/stripe";

export function SubscriptionInfo({ user }: { user: any }) {
  const handleBilling = async () => {
    if (user?.subscription?.customer_id) {
      const data = JSON.parse(
        await manageBilling(user?.subscription?.customer_id),
      );
      window.location.href = data?.url;
    }
  };

  return (
    <div className="space-y-5">
      <h1>Hi, {user.username}</h1>
      <p>
        Your subscription ends on{" "}
        {new Date(user.subscription.expires_at).toDateString()}
      </p>
      {user.subscription.customer_id && (
        <Button onClick={handleBilling}>Cancel</Button>
      )}
    </div>
  );
}
