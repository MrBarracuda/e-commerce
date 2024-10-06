import { Profile } from "@/components/navbar/profile";
import { MainNav } from "@/components/navbar/main-nav";
import { navigationConfig } from "@/config/navigation";
import { Wrapper } from "@/components/wrapper";
import { ModeToggle } from "@/components/navbar/mode-toggle";
import { CartSheet } from "@/components/navbar/cart-sheet";

export function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 border-b bg-background">
      <header className="relative">
        <Wrapper>
          <div className="flex h-16 items-center justify-between">
            <MainNav items={navigationConfig.mainNav} />
            <nav className="flex items-center gap-2">
              {/*//TODO: add cart, favorite?, search? */}
              <CartSheet />
              <ModeToggle />
              <Profile />
            </nav>
          </div>
        </Wrapper>
      </header>
    </div>
  );
}
