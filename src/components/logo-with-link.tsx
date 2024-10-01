import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { type AnchorHTMLAttributes } from "react";

interface LogoWithLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  showName?: boolean;
}

export function LogoWithLink({ showName = false }: LogoWithLinkProps) {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "link" }),
        "hover:text-muted-foreground hover:no-underline",
      )}
    >
      <Icons.logo size={36} />
      {showName ? (
        <div className="text-md ml-2 hidden flex-none font-medium uppercase lg:block">
          HYPESNEAKERS
        </div>
      ) : null}
    </Link>
  );
}
