"use server";

import { cache } from "react";
import { supabaseServer } from "@/lib/supabase/server";

export const getCurrentUserId = cache(async () => {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Error getting session");
  }

  if (!data.session) {
    throw new Error("No session found");
  }

  if (data.session.user.aud === "authenticated") {
    console.log("GET CURRENT USER ID FUNCTION HAS BEEN FIRED");
    return data.session.user.id;
  }

  throw new Error("User is not authenticated or unknown error");
});
