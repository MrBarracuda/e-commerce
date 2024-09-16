import { type Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { AuthForm } from "@/components/auth-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Join us or Sign in to your account",
};

export default function Auth() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-4 text-center">
          <Icons.logo className="mx-auto h-8 w-8" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Enter your email to join us or sign in
          </h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthForm />
        </Suspense>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By continuing, I agree to{" "}
          <Link
            href="https://www.linkedin.com/in/dmytro-dobrovolskyi-7a498a193/"
            className="hover:text-brand underline underline-offset-4"
            target="_blank"
          >
            Hype sneaker’s Privacy Policy{" "}
          </Link>
          and
          <Link
            href="https://www.linkedin.com/in/dmytro-dobrovolskyi-7a498a193/"
            className="hover:text-brand underline underline-offset-4"
            target="_blank"
          >
            {" "}
            Terms of Use
          </Link>
        </p>
      </div>
    </div>
  );
}
