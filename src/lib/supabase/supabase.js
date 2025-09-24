// Import the Supabase client creator
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance
// This client allows you to interact with your Supabase project (database, auth, storage, etc.)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,      // Supabase project URL (stored in environment variable)
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Supabase anonymous public key (stored in environment variable)
);
