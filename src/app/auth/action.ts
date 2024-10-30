"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { userAuthSchema } from "@/lib/validations/auth";
import { redirect } from "next/navigation";

export const authAction = actionClient
  .schema(userAuthSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = supabaseServer();
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    // const response = await supabase.auth.sign
    console.log(data, error);

    if (error) {
      return { successful: false, error: error.message };
    }
    //TODO: improve handling of errors
    // if (error) {
    //   return { successful: false, error: error.message };
    // }

    revalidatePath("/", "layout");

    return { successful: true, email };
  });
