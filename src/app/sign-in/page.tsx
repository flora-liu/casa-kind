"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClientComponentClient();
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      redirect("/home");
    }
  }

  const handleProviderSignIn = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) setError(error.message);
  };

  return (
    <div className="h-[800px] flex flex-col items-center justify-center">
      <div className="relative mx-auto sm:max-w-2xl p-4 w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Sign into your account
            </p>
          </div>
          <div>
            <form action={signIn} className="grid gap-2">
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
                Sign In
              </Button>
            </form>
            <Button
              className="mt-2 w-full"
              variant="outline"
              onClick={() => handleProviderSignIn("google")}
            >
              Sign in with Google
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Link variant="muted" href="/sign-up">
              Create an account
            </Link>
          </div>
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
