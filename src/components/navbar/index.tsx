import { Profile } from "@/components/navbar/profile";
import { MainNav } from "@/components/navbar/main-nav";
import { navigationConfig } from "@/config/navigation";
import { ModeToggle } from "@/components/navbar/mode-toggle";
import { CartSheet } from "@/components/navbar/cart-sheet";
import { getUser } from "@/data-access/user";

export async function Navbar() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 h-16">
      <div className="bg-background drop-shadow-sm transition delay-150 group-[[data-scroll-direction='down']]:-translate-y-16 dark:border-b">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-6">
          <MainNav items={navigationConfig.mainNav} />
          <nav className="flex items-center gap-1.5">
            <CartSheet />
            <ModeToggle />
            <Profile
              avatar={user?.avatar ?? ""}
              isLoggedIn={!!user?.id}
              username={user?.username ?? ""}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
