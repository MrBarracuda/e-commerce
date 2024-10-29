"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/data-access/auth";
import { type UserForm } from "@/app/settings/(user)/validation";

export async function updateUser(user: UserForm) {
  const { err, id } = await getCurrentUserId();

  if (!id) {
    throw new Error(err ?? "No user id");
  }

  await db
    .update(userTable)
    .set({ fullName: `${user.firstName} ${user.lastName}`, ...user })
    .where(eq(userTable.id, id));
}

export async function getUser() {
  const { err, id } = await getCurrentUserId();

  if (!id) {
    console.log(err ?? "No user id");
    return null;
  }

  return db.query.userTable.findFirst({
    where: (model) => eq(model.id, id),
  });

  // return db.query.userTable.findFirst({
  //   where: eq(userTable.id, id),
  // });
}
