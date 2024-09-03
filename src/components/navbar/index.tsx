import { NavItems } from "@/components/navbar/nav-items";
import { ModeToggle } from "@/components/navbar/mode-toggle";

// import { CartSheet } from "@/components/navbar/cart-sheet";
// import { SearchSheet } from "@/components/navbar/search-sheet";
import { LogoWithLink } from "@/components/logo-with-link";
import { Profile } from "@/components/navbar/profile";
import { Wrapper } from "@/components/wrapper";

// TODO: implement mobile menu
export function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 border-b bg-background">
      <header className="relative">
        <Wrapper>
          <div className="flex h-16 items-center justify-between">
            <div className="ml-4 flex lg:ml-0">
              <LogoWithLink showName />
            </div>

            <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              {/*<NavItems />*/}
            </div>

            <div className="flex items-center gap-2">
              <ModeToggle />
              {/*<SearchSheet />*/}
              {/*<CartSheet />*/}
              <Profile />
            </div>
          </div>
        </Wrapper>
      </header>
    </div>
  );
}
