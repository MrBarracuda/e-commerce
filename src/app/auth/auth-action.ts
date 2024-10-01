"use server";

import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { userAuthSchema } from "@/lib/validations/auth";

export const authAction = actionClient
  .schema(userAuthSchema)
  .action(async ({ parsedInput: { email } }) => {
    console.log("email", email);
    const supabase = supabaseServer();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      // redirect('/error')
      returnValidationErrors(userAuthSchema, {
        _errors: ["Invalid email1"],
        email: {
          _errors: ["Invalid email2"],
        },
      });
    }
    //
    revalidatePath("/");
    // redirect("/");
    console.log("email", email);

    return {
      successful: true,
      email,
    };
  });
