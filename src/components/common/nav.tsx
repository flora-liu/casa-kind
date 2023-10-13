"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

import { IconChevronDown } from "@/components/common/icons";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const supabase = createClientComponentClient();

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="absolute top-0 left-0 translate-x-4 translate-y-5 md:translate-x-10 md:translate-y-10 z-50">
          <Button asChild variant="accent" className="rounded-full px-2">
            <div className="flex justify-between items-center gap-x-3 group">
              <div className="border border-primary rounded-full p-0.5">
                <IconChevronDown className="h-5 w-5" />
              </div>
              <p className="pr-2">Menu</p>
            </div>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col justify-start font-relative text-xl gap-y-3 md:text-3xl md:gap-y-4">
          {isLoggedIn ? (
            <>
              <a href="/home">Home</a>
              <a href="/heart-talk">Heart Talk</a>
              <a href="/meditate">Meditate</a>
              <a href="/journal">Journal</a>
              <button className="text-left" onClick={signOut}>
                Sign Out
              </button>
            </>
          ) : (
            <a href="/sign-in">Sign In</a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { Nav };
