"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { type UserForm } from "@/lib/validations/auth";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/data-access/auth";

export async function updateUserDTO(user: UserForm) {
  const id = await getCurrentUserId();

  await db
    .update(userTable)
    .set({ fullName: `${user.firstName} ${user.lastName}`, ...user })
    .where(eq(userTable.id, id));
}

export async function getUserDTO() {
  const id = await getCurrentUserId();

  return db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  });
}
