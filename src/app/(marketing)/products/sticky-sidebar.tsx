import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function StickySidebar() {
  return (
    <div className="hidden flex-col items-start justify-start space-y-6 pr-5 md:flex">
      <h2 className="text-lg">Filters</h2>
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
  );
}
