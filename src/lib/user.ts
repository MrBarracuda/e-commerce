"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema";

export async function getCurrentUser() {
  const supabase = supabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user from Supabase:", error);
  }

  if (user) {
    try {
      return await getOneUser(user.id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
}

export async function getOneUser(id: string) {
  return db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  });
}
