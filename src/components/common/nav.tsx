"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

import { IconChevronDown } from "@/components/common/icons";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/components/common/global-provider";
import { useRouter } from "next/navigation";

function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const supabase = createClientComponentClient();
  const { navPosition } = useGlobalContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          navPosition === "absolute"
            ? "absolute top-0 left-0 translate-x-4 translate-y-5 md:translate-x-6 md:translate-y-8 z-50"
            : "flex justify-start px-5 py-6 md:px-8"
        )}
      >
        <SheetTrigger>
          <Button asChild variant="accent" className="rounded-full px-2">
            <div className="flex justify-between items-center gap-x-3 group">
              <div className="border border-primary rounded-full p-0.5">
                <IconChevronDown className="h-5 w-5" />
              </div>
              <p className="pr-2">Menu</p>
            </div>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="rounded-r-3xl">
        <div className="flex flex-col justify-start font-relative tracking-tight text-xl gap-y-3 md:text-3xl md:gap-y-4">
          {isLoggedIn ? (
            <>
              <a href="/home">Home</a>
              <a href="/journal">Journal</a>
              <a href="/heart-talk">Heart Talk</a>
              <a href="/meditate">Meditate</a>
              <button
                className="text-left focus:outline-none"
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a href="/">Home</a>
              <a href="/sign-in">Sign In</a>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { Nav };
