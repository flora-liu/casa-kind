"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { headers } from "next/headers";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const supabase = createClientComponentClient();

  async function signUp() {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else if (data?.user?.email) {
      setSuccess(true);
      setEmail(data?.user?.email);
    }
  }

  return (
    <div className="h-[800px] flex flex-col items-center justify-center">
      <div className="relative mx-auto sm:max-w-2xl p-4 w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              {success && email
                ? `Check your email ${email} for a confirmation link to activate your account.`
                : "Enter your email below to create your account"}
            </p>
          </div>
          {success ? (
            <Button asChild className="mt-6">
              <a href="/sign-in">Sign in</a>
            </Button>
          ) : (
            <>
              <form action={signUp} className="grid gap-2">
                <Input
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="on"
                />
                <Button className="mt-2" type="submit">
                  Sign up
                </Button>
              </form>
              <div className="flex flex-row justify-center flex-wrap">
                <span className="text-muted-foreground text-sm mr-1.5">
                  Already have an account?{" "}
                </span>
                <Link variant="muted" href="/sign-in">
                  Sign in
                </Link>
              </div>
            </>
          )}
          {errorMsg && (
            <div className="flex flex-col items-center">
              <p className="text-sm text-destructive">{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
