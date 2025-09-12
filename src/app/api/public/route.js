import { supabase } from "/lib/supabase/supabase"

export async function GET(request){
    const { data, error} = await supabase.from("tes").select("*");
  if (error){
    console.log(error)
  }
  return new Response(JSON.stringify(data), {status: 200})
}