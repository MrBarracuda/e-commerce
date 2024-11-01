"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { protectedPaths } from "@/config/protected-paths";
import { redirect } from "next/navigation";
import { flattenValidationErrors } from "next-safe-action";

const logoutSchema = z.string().min(1);

export const logoutAction = actionClient
  .schema(logoutSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: pathname }) => {
    const supabase = supabaseServer();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("ERROR IN LOGOUT REQUEST");
    }

    if (protectedPaths.includes(pathname)) {
      redirect(`/auth?next=${pathname}`);
    }

    revalidatePath(pathname);

    console.error("UNEXPECTED FAILURE IN LOGOUT REQUEST", error);
  });
