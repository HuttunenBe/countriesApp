// Import the configured Supabase client
import { supabase } from "../../../lib/supabase/supabase";

// Define the GET request handler for this API route
export async function GET(request) {
  // Fetch all rows from the 'test' table in Supabase
  // supabase.from("test").select("*") returns { data, error }
  const { data, error } = await supabase.from("test").select("*");

  // If there was an error fetching data, log it to the console
  if (error) {
    console.log(error);
  }

  // Log the fetched data to the console (for debugging)
  console.log("Data: ", data);

  // Return a Response object with JSON data and HTTP status 200
  return new Response(JSON.stringify(data), { status: 200 });
}
