import { Hero } from "@/components/hero";
import { Price } from "@/app/profile/subscription/price";
import { Features } from "@/components/features";
import { Newsletter } from "@/components/newsletter";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Price />
      <Newsletter />
    </>
  );
}
