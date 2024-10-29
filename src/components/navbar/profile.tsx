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
import { LogoutButton } from "@/components/navbar/logout-button";

type ProfileProps = {
  avatar: string;
  username: string;
  isLoggedIn: boolean;
};

export function Profile({ avatar, username, isLoggedIn }: ProfileProps) {
  if (!isLoggedIn) {
    return (
      <Link href="/auth">
        <Button variant="ghost" size="icon" aria-label="join us or login">
          <Icons.profile />
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="profile dropdown">
        <Avatar>
          <AvatarImage src={avatar} alt="profile image" />
          <AvatarFallback>{username?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            aria-label="settings"
            className="appearance-none"
          >
            <Icons.settings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/order" aria-label="orders" className="appearance-none">
            {/*TODO: Allow to navigate to dashboard if user has role of a admin */}
            <Icons.rocket />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            aria-label="dashboard"
            className="appearance-none"
          >
            {/*TODO: Allow to navigate to dashboard if user has role of a admin */}
            <Icons.dashboard />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* LOG OUT BUTTON */} <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
