import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database/types";

const landingPath = "/";
const authenticatedPaths = ["/home", "/heart-talk", "/meditate", "journal"];
const authPaths = ["/sign-in", "/sign-up"];

/** Middleware to ensure that the user's session does not time out or become stale */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /** If user is signed in and the current path is / redirect the user to /home */
  if (user && [landingPath, ...authPaths].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  /** If user is not signed in and the current path is authenticated, redirect the user to / */
  if (!user && authenticatedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return res;
}

/** We really only need this middleware to run on authenticated routes */
export const config = {
  matcher: [landingPath, authenticatedPaths, authPaths],
};
