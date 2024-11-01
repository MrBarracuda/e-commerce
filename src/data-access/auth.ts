"use server";

import { cache } from "react";
import { supabaseServer } from "@/lib/supabase/server";

export const getCurrentUserId = cache(async () => {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return { err: "Error getting session", id: null };
  }

  if (!data.session) {
    return { err: "No session found", id: null };
  }

  if (data?.session?.user?.aud === "authenticated") {
    console.log("GET CURRENT USER ID FUNCTION HAS BEEN FIRED");
    return { err: null, id: data.session.user.id };
  }

  return {
    err: "User is not authenticated or unknown error",
    id: null,
  };
});
