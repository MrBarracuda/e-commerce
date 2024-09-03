import { db } from "@/server/db";
import { Hero } from "@/components/hero";

export default async function HomePage() {
  // const posts = await db.query.posts.findMany();

  return (
    <>
      <Hero />
    </>
  );
}
