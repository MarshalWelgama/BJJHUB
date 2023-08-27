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
  return data;
};

export const updateTimeDb = async (
  instructional: string,
  volume: string,
  last_time: string
) => {
  const { data, error } = await supabase
    .from("user_progress")
    .upsert({
      instructional: instructional,
      volume: volume,
      timestamp: last_time,
    })
    .select();

  if (error) {
    return error;
  }
  return data;
};

export const getLastTimeDb = async (
  instructional: string,
  volume: string
): Promise<string | undefined> => {
  try {
    const { data: lastTimeData, error: lastTimeError } = await supabase
      .from("user_progress") // Specify the table name
      .select("timestamp") // Select the 'last_time' column
      .eq("instructional", instructional)
      .eq("volume", volume); // Filter rows where both instructional and volume match

    if (lastTimeError) {
      throw lastTimeError;
    } else {
      if (lastTimeData.length > 0) {
        const lastTime = lastTimeData[0].timestamp; // Assuming only one result is expected
        return lastTime;
      } else {
        return undefined;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
