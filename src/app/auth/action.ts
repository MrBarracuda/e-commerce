"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { userAuthSchema } from "@/lib/validations/auth";

//TODO: fix issue magic link doesn't work
export const authAction = actionClient
  .schema(userAuthSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = supabaseServer();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        // emailRedirectTo: next ?? window.location.origin,
      },
    });

    if (error) {
      return { successful: false, error: error.message };
    }

    revalidatePath("/", "layout");

    return { successful: true, error: null };
  });
