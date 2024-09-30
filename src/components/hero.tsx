import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Wrapper } from "@/components/wrapper";

export function Hero() {
  return (
    <Wrapper className="bg-[url(/bg-light.svg)] bg-cover bg-repeat py-16 dark:bg-[url(/bg-dark.svg)]">
      <section className="mx-auto flex max-w-4xl flex-col items-center py-16 text-center">
        <h1 className="-m-1 text-5xl font-semibold md:text-6xl">
          Discover premium perfume replicas with unmatched quality
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
      </section>
    </Wrapper>
  );
}
