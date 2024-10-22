"use server";

import { db } from "@/db";
import { addressTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/data-access/auth";
import { type AddressForm } from "@/app/settings/profile/(address)/validation";

export async function updateAddress(address: AddressForm) {
  const id = await getCurrentUserId();

  await db
    .update(addressTable)
    .set({ ...address })
    .where(eq(addressTable.userId, id));
}

export async function getAddress() {
  const id = await getCurrentUserId();

  return db.query.addressTable.findFirst({
    where: eq(addressTable.userId, id),
  });
}
