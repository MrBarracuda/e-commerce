import { createClient } from '@supabase/supabase-js'
import {env} from "@/env";
import { type Database} from "@/lib/types/database.types";


export async function supabaseAdmin() {


  const supabase = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ADMIN, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

// Access auth admin api
//   const adminAuthClient = supabase.auth.admin

  return supabase;
}
