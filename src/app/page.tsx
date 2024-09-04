import { db } from "@/server/db";
import { Hero } from "@/components/hero";
import Price from "@/app/subscription/price";

export default async function HomePage() {
  // const posts = await db.query.posts.findMany();

  return (
    <>
      <Hero />
      <Price />
    </>
  );
}
