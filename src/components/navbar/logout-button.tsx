"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { logoutAction } from "@/lib/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

export function LogoutButton() {
  const queryClient = useQueryClient();
  const pathname = usePathname();

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

  return (
    <DropdownMenuItem
      className="font-medium text-red-500 focus:text-red-600"
      onClick={handleLogOut}
    >
      <Icons.exit />
      Log out
    </DropdownMenuItem>
  );
}
