"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { userAuthSchema } from "@/lib/validations/auth";

export const authAction = actionClient
  .schema(userAuthSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = supabaseServer();
    // const { data, error } = await supabase.auth.signInWithOtp({ email });
    console.log(email);
    //TODO: improve handling of errors
    // if (error) {
    //   return { successful: false, error: error.message };
    // }

    revalidatePath("/");

    // TODO: return a different shape of the response
    return {
      successful: true,
      email,
    };
  });
