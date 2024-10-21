"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { protectedPaths } from "@/config/protected-paths";
import { redirect } from "next/navigation";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type User } from "@/types";
import { updateUserSchema } from "@/lib/validations/auth";
import { getCurrentUser } from "@/lib/user";

const logOutSchema = z.string().min(1);

export const logOut = actionClient
  .schema(logOutSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: path }) => {
    const supabase = supabaseServer();
    const { error } = await supabase.auth.signOut();

    if (protectedPaths.includes(path)) {
      redirect(`/auth?next=${path}`);
    }

    revalidatePath(path);

    return { message: `logged out`, error };
  });
