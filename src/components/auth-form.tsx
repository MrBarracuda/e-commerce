"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { supabaseClient } from "@/lib/supabase/client";
import { type FormData } from "@/lib/validations/auth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import LoginOauth from "@/app/auth/login-oauth";

type AuthFormProps = HTMLAttributes<HTMLDivElement>;

const schema = z.object({
  email: z.string().email(),
});

export function AuthForm({ className, ...props }: AuthFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const next = searchParams.get("next") ?? "";

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const supabase = supabaseClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: formData.email.toLowerCase(),
      options: {
        // TODO: fix issue with redirects
        emailRedirectTo: next ?? window.location.origin,
      },
    });

    setIsLoading(false);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    reset();

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <LoginOauth />
    </div>
  );
}
