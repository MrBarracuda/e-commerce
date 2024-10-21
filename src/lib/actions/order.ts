"use server";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// const takeFirstOrUndefined = <T>(values: T[] | undefined): T | undefined => {
//   return values && values.length > 0 ? values[0] : undefined;
// };

export async function userOrderExists(userId: string, productId: string) {
  // const order = await db.query.orderTable.findFirst({
  //   where: and(
  //     eq(orderTable.userId, userId),
  //     eq(orderTable.productId, productId),
  //   ),
  //   columns: {
  //     id: true,
  //   },
  // });

  const order = await db.query.orderTable
    .leftJoin(orderItemTable, eq(orderTable.id, orderItemTable.orderId))
    .findFirst({
      where: and(
        eq(orderTable.userId, userId),
        eq(orderItemTable.productId, productId),
      ),
      columns: {
        id: true,
      },
    });

  return order != null;
}
