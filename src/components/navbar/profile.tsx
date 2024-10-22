"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import { logoutAction } from "@/lib/actions/auth";

export function Profile() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { data: user, isLoading, isRefetching } = useUser();
  const { executeAsync } = useAction(logoutAction, {
    onSuccess,
    onError,
  });
  const { toast } = useToast();

  function onSuccess() {
    toast({
      title: "Log out successfully",
      description: "Come back ",
    });
  }

  function onError() {
    toast({
      title: "Something went wrong.",
      description: "Your log out request failed. Please try again.",
      variant: "destructive",
    });
  }

  async function handleLogOut() {
    await executeAsync(pathname);
    queryClient.clear();
  }

  if (isLoading || isRefetching) {
    return (
      <Avatar>
        <AvatarFallback>
          <Skeleton className="h-full w-full rounded-full" />
        </AvatarFallback>
      </Avatar>
    );
  }

  if (user?.id) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="profile dropdown">
          <Avatar>
            <AvatarImage src={user.avatar ?? ""} alt="profile image" />
            <AvatarFallback>{user.username?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              aria-label="settings"
              className="appearance-none"
            >
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              aria-label="dashboard"
              className="appearance-none"
            >
              {/*TODO: Allow to navigate to dashboard if user has role of a admin */}
              Dashboard
            </Link>
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

  return (
    <Link href="/auth">
      <Button variant="ghost" size="icon" aria-label="join us or login">
        <Icons.profile />
      </Button>
    </Link>
  );
}
