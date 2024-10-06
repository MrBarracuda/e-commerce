"use client";

// import { api } from "@/trpc/react";

import { Wrapper } from "@/components/wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const user = {
  username: "mock_username",
};
export default function Profile() {
  // const { data: user } = api.user.getCurrentUser.useQuery();
  //
  // if (!user) {
  //   return <></>;
  // }

  return (
    <>
      <Wrapper className="py-16">
        <h1 className="text-3xl">{user?.username} profile</h1>
        <Link
          href="/settings/billing"
          className={cn(buttonVariants({ variant: "link" }), "text-lg")}
        >
          Billing
        </Link>
      </Wrapper>
    </>
  );
}
