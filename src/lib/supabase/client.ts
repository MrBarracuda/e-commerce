import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "@/db/types";
import { env } from "@/env";

export function supabaseClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
