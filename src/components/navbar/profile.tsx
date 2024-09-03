"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PROTECTED_PATH } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/client";
import { useUser } from "@/hooks/use-user";
// import { api } from "@/trpc/react";

export function Profile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // TODO: move this logic to auth-form, create a global store for user data object
  const { data: user } = useUser();
  //
  // const { data: user } = api.user.getCurrentUser.useQuery();

  const handleLogOut = async () => {
    const supabase = createClient();

    queryClient.clear();

    const { error } = await supabase.auth.signOut();

    router.refresh();

    // if (PROTECTED_PATH.includes(pathname)) {
    //   router.replace("/auth?next=" + pathname);
    // }

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your log out request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Log out successfully",
      description: "Come back ",
    });
  };

  return !user?.id ? (
    <Link href="/auth">
      <Button variant="ghost" size="icon" aria-label="join us or login">
        {/*TODO: fix issue two focus elements exist instead of one */}
        <Icons.profile />
      </Button>
    </Link>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-hidden>
        <Button variant="ghost" size="icon" aria-label="profile dropdown">
          <Avatar>
            <AvatarImage src={user.avatar ?? ""} />
            <AvatarFallback>{user.username?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          {/*<Link*/}
          {/*  href="/profile"*/}
          {/*  aria-label="profile"*/}
          {/*  className="appearance-none"*/}
          {/*>*/}
          Profile
          {/*</Link>*/}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          {/*<Link href="/dashboard">*/}
          {/*TODO: Allow to navigate to dashboard if user has role of a seller */}
          Seller Dashboard
          {/*</Link>*/}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-red-600"
          onClick={handleLogOut}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
