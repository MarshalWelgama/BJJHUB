import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export const insertToDb = async (
  instructional: [
    | {
        instructional: string;
        volume: string;
        link: string;
        last_updated: string;
      }
    | {
        instructional: string;
        last_updated: string;
      }
  ],
  dbName: string
) => {
  const { data, error } = await supabase
    .from(dbName)
    .upsert(instructional)
    .select();

  if (error) {
    return error;
  }
  console.log(data);
  return data;
};
