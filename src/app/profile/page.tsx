"use client";

// import { api } from "@/trpc/react";

import { Wrapper } from "@/components/wrapper";
import Link from "next/link";

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
      <Wrapper className="py-20">
        <h1 className="text-3xl">{user?.username} profile</h1>
        <Link href="/profile/subscription">subscription</Link>
      </Wrapper>
    </>
  );
}
