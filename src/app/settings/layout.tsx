import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/container";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container className="mx-auto max-w-screen-lg">
      <div className="block md:grid md:grid-cols-4 md:space-x-10">
        <div className="fixed hidden space-y-6 md:block">
          <h2 className="break-all text-3xl font-bold">
            Account
            <br /> Management
          </h2>
          <div className="flex flex-col items-start gap-y-0.5">
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
            <Link
              href="#subscription"
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-4 font-semibold uppercase hover:text-muted-foreground",
              )}
            >
              subscription
            </Link>
          </div>
        </div>

        {/*right side*/}
        {children}
      </div>
    </Container>
  );
}
