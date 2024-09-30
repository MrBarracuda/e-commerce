import { supabaseClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";

export default function LoginOauth() {
  const searchParams = useSearchParams();
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const next = searchParams.get("next") ?? "";

  return (
    <>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          handleLoginWithOAuth("github", next);
        }}
        disabled={isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Github
      </button>

      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          handleLoginWithOAuth("google", next);
        }}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </button>
    </>
  );
}

type Provider = "google" | "github";

function handleLoginWithOAuth(provider: Provider, next: string) {
  const supabase = supabaseClient();
  void supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + "/auth/callback?next=" + next,
    },
  });
}
