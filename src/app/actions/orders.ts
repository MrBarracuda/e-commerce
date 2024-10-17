"use server";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// const takeFirstOrUndefined = <T>(values: T[] | undefined): T | undefined => {
//   return values && values.length > 0 ? values[0] : undefined;
// };

export async function userOrderExists(userId: string, productId: string) {
  // const order = await db
  //   .select({ id: orderTable.id })
  //   .from(orderTable)
  //   .where(
  //     and(eq(orderTable.userId, userId), eq(orderTable.productId, productId)),
  //   )
  //   .then(takeFirstOrUndefined);

  const order = await db.query.orderTable.findFirst({
    where: and(
      eq(orderTable.userId, userId),
      eq(orderTable.productId, productId),
    ),
    columns: {
      id: true,
    },
  });

  return order != null;
}
