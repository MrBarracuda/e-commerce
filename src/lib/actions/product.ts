import { db } from "@/db";
import { productTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProducts() {
  return db.select().from(productTable);
}

export async function getProductById(id: string) {
  // return await db
  //   .select()
  //   .from(productTable)
  //   .where(eq(productTable.id, Number(id)))
  //   .then((result) => result[0]);

  return db.query.productTable.findFirst({
    where: eq(productTable.id, Number(id)),
  });
}
