import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database/types";
import {
  heartTalk,
  homeBase,
  journal,
  meditate,
  signIn,
  signUp,
} from "@/lib/routes";

const landingPath = "/";
const authenticatedPaths = [
  homeBase.href,
  heartTalk.href,
  meditate.href,
  journal.href,
];
const authPaths = [signIn.href, signUp.href];

/** Middleware to ensure that the user's session does not time out or become stale */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    /** https://github.com/vercel/next.js/issues/49373#issuecomment-1655577473 */
    res.cookies.delete(`sb-${process.env.SUPABASE_PROJECT_ID}-auth-token`);
  }

  /** If user is signed in and the current path is / redirect the user to /home */
  if (user && [landingPath, ...authPaths].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(homeBase.href, req.url));
  }

  /** If user is not signed in and the current path is authenticated, redirect the user to / */
  if (!user && authenticatedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(signIn.href, req.url));
  }

  return res;
}

/** We really only need this middleware to run on authenticated routes */
export const config = {
  matcher: ["/", homeBase.href, heartTalk.href, meditate.href, journal.href],
};
