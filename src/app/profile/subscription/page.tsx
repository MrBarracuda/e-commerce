"use client";

import {useUser} from "@/hooks/use-user";
import Price from "@/app/profile/subscription/price";
import {SubscriptionInfo } from "./subscriptionInfo";
import {isSubActive} from "@/lib/utils";

export default function Subscription() {
  // (select auth.jwt()) ->> 'email' = email
  const {data: user, isLoading} = useUser();

  if (isLoading) {
    return <></>
  }

  const isActive = isSubActive(user?.subscription?.expires_at)
  return (
    <div>
      {/*<h1>This is subscription page</h1>*/}
      {isActive ? <SubscriptionInfo user={user}/> : <Price />}
    </div>
  );
}

