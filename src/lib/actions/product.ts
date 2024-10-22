import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProducts() {
  return db.select().from(productTable);
}

export async function getProductById(id: string) {
  return db.query.productTable.findFirst({
    where: eq(productTable.id, parseInt(id)),
  });
}
