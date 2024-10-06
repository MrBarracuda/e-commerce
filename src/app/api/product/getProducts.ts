import { db } from "@/db";
import { productTable, subscriptionTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProducts() {
  const products = await db.select().from(productTable);
  // .where(eq(subscriptionTable.email, userEmail))
  // .limit(1)
  // .execute()
  // .then((result) => {
  //   // console.log("Query result:", result); // Log the result here for debugging
  //   return result[0];
  // });
  return products;
}
