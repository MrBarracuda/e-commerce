"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/data-access/auth";
import { type UserForm } from "@/app/settings/profile/(user)/validation";

export async function updateUser(user: UserForm) {
  const id = await getCurrentUserId();

  await db
    .update(userTable)
    .set({ fullName: `${user.firstName} ${user.lastName}`, ...user })
    .where(eq(userTable.id, id));
}

export async function getUser() {
  const id = await getCurrentUserId();

  return db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  });
}
