import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/container";

export function Hero() {
  return (
    <Container className="bg-background bg-cover bg-repeat py-16 dark:bg-[url(/bg-dark.svg)]">
      <div className="mx-auto flex flex-col items-center py-16 text-center">
        <h1 className="-m-1 text-balance font-serif text-5xl font-semibold tracking-tighter sm:text-6xl">
          Discover premium perfume replicas with unmatched{" "}
          <span className="text-[#cbe449]">quality</span>
        </h1>
        <p className="mt-6 max-w-prose text-lg text-muted-foreground">
          Experience the luxury of high-end fragrances at a fraction of the
          cost. Our expertly crafted replicas capture the essence of the
          originals with incredible precision.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link href="/products" className={buttonVariants()}>
            Browse Bestsellers
          </Link>
          <button className={buttonVariants({ variant: "ghost" })}>
            Contact Us &rarr;
          </button>
        </div>
      </div>
    </Container>
  );
}
