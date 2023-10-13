"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IconChevronDown } from "./icons";
import { cn } from "@/lib/utils";

function Nav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="absolute top-0 left-0 translate-x-4 translate-y-5 md:translate-x-10 md:translate-y-10 z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button
        variant="accent"
        className="rounded-full px-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center gap-x-3 group">
          <div
            className={cn(
              "border border-primary rounded-full p-0.5 -rotate-90 transition-all hover:rotate-0 group-hover:rotate-0 ease-in-out",
              isOpen ? "rotate-0" : "-rotate-90"
            )}
          >
            <IconChevronDown className="h-5 w-5" />
          </div>
          <p className="pr-2">Menu</p>
        </div>
      </Button>
      {isOpen && (
        <div className="bg-accent mt-1 rounded-lg flex flex-col items-start overflow-hidden p-1">
          <Button
            asChild
            variant="custom"
            className="rounded-none w-full justify-start py-1.5 px-2"
          >
            <a href="/home">Home</a>
          </Button>
          <Button
            asChild
            variant="custom"
            className="rounded-none w-full justify-start py-1.5 px-2"
          >
            <a href="/heart-talk">Heart Talk</a>
          </Button>
          <Button
            asChild
            variant="custom"
            className="rounded-none w-full justify-start py-1.5 px-2"
          >
            <a href="/meditate">Meditate</a>
          </Button>
          <Button
            asChild
            variant="custom"
            className="rounded-none w-full justify-start py-1.5 px-2"
          >
            <a href="/journal">Journal</a>
          </Button>
          <form action="/auth/sign-out" method="post" className="w-full">
            <Button
              variant="custom"
              className="rounded-none w-full justify-start py-1.5 px-2"
            >
              Sign out
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export { Nav };
