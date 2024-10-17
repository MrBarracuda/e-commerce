"use client";

import { Wrapper } from "@/components/wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

export default function Profile() {
  // const user = await getCurrentUser();
  const { data: user } = useUser();

  // improve handling such flow
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Wrapper className="py-16">
        <h1 className="text-3xl">{user.fullName} profile</h1>
        <h2>username: {user.username}</h2>
        <Link
          href="/settings/billing"
          className={cn(buttonVariants({ variant: "link" }), "text-lg")}
        >
          Billing
        </Link>

        <Link
          href="/settings/profile"
          className={cn(buttonVariants({ variant: "link" }), "text-lg")}
        >
          Profile
        </Link>
      </Wrapper>
    </>
  );
}
