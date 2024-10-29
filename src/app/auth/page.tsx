import { type Metadata } from "next";
import Link from "next/link";

import { Icons } from "@/components/icons";
import AuthForm from "@/app/auth/auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Join us or Sign in to your account",
};

export default function Auth() {
  return (
    <div className="relative flex h-[90vh] w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <Icons.chevronLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-8 w-8" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <AuthForm />
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
