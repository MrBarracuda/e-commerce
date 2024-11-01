"use server";

import { db } from "@/db";
import { addressTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/data-access/auth";
import { type AddressForm } from "@/app/settings/(address)/validation";

export async function updateAddress(address: AddressForm) {
  const { err, id } = await getCurrentUserId();

  if (!id) {
    throw new Error(err ?? "No user id");
  }

  await db
    .update(addressTable)
    .set({ ...address })
    .where(eq(addressTable.userId, id));
}

export async function getAddress() {
  const { err, id } = await getCurrentUserId();

  if (!id) {
    throw new Error(err ?? "No user id");
  }

  return db.query.addressTable.findFirst({
    where: eq(addressTable.userId, id),
  });
}
