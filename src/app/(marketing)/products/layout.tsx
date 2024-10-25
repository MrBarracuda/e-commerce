import Link from "next/link";
import { Wrapper } from "@/components/wrapper";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/container";

export default function ProductListLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row gap-x-10">
      <div className="hidden space-y-6 md:block">
        <h2 className="text-xl uppercase">filters</h2>
        <div className="flex flex-col items-start gap-y-0.5">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "link" }),
              "-ml-4 font-semibold uppercase hover:text-muted-foreground",
            )}
          >
            price
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "link" }),
              "-ml-4 font-semibold uppercase hover:text-muted-foreground",
            )}
          >
            grind
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "link" }),
              "-ml-4 font-semibold uppercase hover:text-muted-foreground",
            )}
          >
            size
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
