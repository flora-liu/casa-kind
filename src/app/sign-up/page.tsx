"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const supabase = createClientComponentClient();

  async function signUp() {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else if (data?.user?.email) {
      setSuccess(true);
      setEmail(data?.user?.email);
    }
  }

  const handleProviderSignUp = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
        // queryParams: {
        //   access_type: "offline",
        //   prompt: "consent",
        // },
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="h-[calc(100vh-85px)] flex flex-col items-center justify-center">
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
              <div>
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
                <Separator className="my-4 md:my-8" />
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleProviderSignUp("google")}
                >
                  Sign up with Google
                </Button>
              </div>
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
          {error && (
            <div className="flex flex-col items-center">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
