"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { IconChevronDown } from "@/components/common/icons";
import { redirect } from "next/navigation";

function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const supabase = createClientComponentClient();

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="absolute top-0 left-0 translate-x-4 translate-y-5 md:translate-x-10 md:translate-y-10 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="ring-0">
          <Button asChild variant="accent" className="rounded-full px-2">
            <div className="flex justify-between items-center gap-x-3 group">
              <div className="border border-primary rounded-full p-0.5">
                <IconChevronDown className="h-5 w-5" />
              </div>
              <p className="pr-2">Menu</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl">
          {isLoggedIn ? (
            <>
              <DropdownMenuItem asChild className="rounded-lg">
                <a href="/home">Home</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <a href="/heart-talk">Heart Talk</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <a href="/meditate">Meditate</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <a href="/journal">Journal</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg" onClick={signOut}>
                Sign Out{" "}
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild className="rounded-lg">
              <a href="/sign-in">Sign In</a>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { Nav };
