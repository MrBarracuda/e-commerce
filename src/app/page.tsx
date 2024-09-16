import { db } from "@/server/db";
import { Hero } from "@/components/hero";
import Price from "@/app/profile/subscription/price";
import { Features } from "@/components/features";
import { Newsletter } from "@/components/newsletter";

export default async function HomePage() {
  // const posts = await db.query.posts.findMany();

  return (
    <>
      <Hero />
      <Features />
      <Price />
      <Newsletter />
    </>
  );
}
