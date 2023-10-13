"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      redirect("/home");
    }
  }

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
          <div className="flex flex-col items-center">
            <Link variant="muted" href="/sign-up">
              Create an account
            </Link>
          </div>
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
