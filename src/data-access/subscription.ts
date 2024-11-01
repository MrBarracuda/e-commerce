import { db } from "@/db";
import { eq } from "drizzle-orm";
import { subscriptionTable } from "@/db/schema";

export async function getSubscription(email: string) {
  return db.query.subscriptionTable.findFirst({
    where: eq(subscriptionTable.email, email),
  });
}
