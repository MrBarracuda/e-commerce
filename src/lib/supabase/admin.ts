import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";
import { type Database } from "@/db/types";

export async function supabaseAdmin() {
  /**
   * Access auth admin api
   * const adminAuthClient = supabase.auth.admin
   */
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_ADMIN,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
