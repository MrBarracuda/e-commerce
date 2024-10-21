"use server";

import { db } from "@/db";
import { addressTable, userTable } from "@/db/schema";
import { type AddressForm } from "@/lib/validations/auth";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/data-access/auth";

export async function setAddressDTO(address: AddressForm) {
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
