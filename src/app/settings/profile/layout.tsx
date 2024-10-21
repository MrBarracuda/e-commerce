import Link from "next/link";
import { Wrapper } from "@/components/wrapper";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Wrapper className="max-w-screen-xl py-12 md:px-12">
      <div className="block md:grid md:grid-cols-4 md:space-x-10">
        <div className="fixed hidden space-y-6 md:block">
          <h2 className="break-all text-3xl font-bold">
            Account
            <br /> Management
          </h2>
          <div className="flex flex-col items-start gap-y-0.5">
            <Link
              href="#username"
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-4 text-sm font-semibold uppercase underline hover:text-muted-foreground",
              )}
            >
              user name
            </Link>
            <Link
              href="#personal-information"
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-4 font-semibold uppercase hover:text-muted-foreground",
              )}
            >
              personal information
            </Link>
            <Link
              href="#address"
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-4 font-semibold uppercase hover:text-muted-foreground",
              )}
            >
              address
            </Link>
          </div>
        </div>

        {/*right side*/}
        {children}
      </div>
    </Wrapper>
  );
}
