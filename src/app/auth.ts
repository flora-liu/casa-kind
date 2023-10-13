import "server-only";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const auth = async ({
  readOnlyRequestCookies,
}: {
  readOnlyRequestCookies: ReturnType<typeof cookies>;
}) => {
  /** Create a Supabase client configured to use cookies */
  const supabase = createServerComponentClient({
    cookies: () => readOnlyRequestCookies,
  });
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(`[DEBUG] auth - supabase.auth.getSession: ${error}`);
    throw error;
  }
  return data.session;
};
