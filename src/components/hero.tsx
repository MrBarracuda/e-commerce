import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Wrapper } from "@/components/wrapper";

export function Hero() {
  return (
    <Wrapper>
      <section className="mx-auto flex max-w-4xl flex-col items-center py-16 text-center">
        <h1 className="-m-1 text-5xl font-semibold md:text-6xl">
          Discover exclusive sneakers with no boundaries</h1>
        <p className="mt-6 max-w-prose text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
          culpa dolorum est laboriosam numquam similique!
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link href="/products" className={buttonVariants()}>
            Browse Trending
          </Link>
          <button className={buttonVariants({variant: "ghost"})}>Contact Us &rarr;</button>
        </div>
      </section>
    </Wrapper>
  );
}
