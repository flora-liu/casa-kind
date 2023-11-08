"use client";

import { forwardRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Link, LinkProps } from "@/components/ui/link";

import {
  IconChevronDown,
  IconExit,
  IconHome,
  IconUser,
} from "@/components/common/icons";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/components/common/global-provider";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavItem {
  key: string;
  title: string | React.ReactNode;
  href?: string; // Link
  description?: string;
  onClick?: string; // Button
}

const desktopLeftNavLinks: Array<NavItem> = [
  {
    key: "home",
    title: (
      <div className="flex items-center gap-1.5">
        <IconHome />
        <p>Home</p>
      </div>
    ),
    href: "/home",
  },
  {
    key: "journal",
    title: "Journal",
    href: "/journal",
    description: "Create space to reflect",
  },
  {
    key: "heart-talk",
    title: "Heart Talk",
    href: "/heart-talk",
    description: "Explore through conversation",
  },
  {
    key: "meditate",
    title: "Meditate",
    href: "/meditate",
    description: "Focus on the breath",
  },
];

const desktopRightSignedInNavLinks: Array<NavItem> = [
  {
    key: "account",
    title: (
      <div className="flex items-center gap-1.5">
        <IconUser />
        <p>Account</p>
      </div>
    ),
    href: "/account",
  },
  {
    key: "sign-out",
    title: (
      <div className="flex items-center gap-1.5">
        <IconExit />
        <p>Sign Out</p>
      </div>
    ),
    onClick: "sign-out",
  },
];

const desktopRightSignedOutNavLinks: Array<NavItem> = [
  {
    key: "sign-in",
    title: "Sign In",
    href: "/sign-in",
  },
  {
    key: "sign-up",
    title: "Sign Up",
    href: "/sign-up",
  },
];

const mobileSignedInNavLinks: Array<NavItem> = [
  {
    key: "home",
    title: "Home",
    href: "/home",
  },
  {
    key: "journal",
    title: "Journal",
    href: "/journal",
  },
  {
    key: "heart-talk",
    title: "Heart Talk",
    href: "/heart-talk",
  },
  {
    key: "meditate",
    title: "Meditate",
    href: "/meditate",
  },
  {
    key: "account",
    title: "Account",
    href: "/account",
  },
  {
    key: "sign-out",
    title: "Sign Out",
    onClick: "sign-out",
  },
];

const mobileSignedOutNavLinks: Array<NavItem> = [
  {
    key: "home",
    title: "Home",
    href: "/",
  },
  {
    key: "sign-in",
    title: "Sign In",
    href: "/sign-in",
  },
];

function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { navPosition } = useGlobalContext();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        navPosition === "absolute"
          ? "absolute top-0 left-0 translate-x-4 translate-y-5 md:translate-x-6 md:translate-y-8 z-50"
          : "relative flex justify-start px-5 py-6 md:px-8 items-center h-[85px]"
      )}
    >
      {/* Desktop menu */}
      <div className="hidden md:flex justify-between items-center w-full m-auto list-none">
        <div className="w-[calc(50%-75px)] flex items-center gap-4">
          {isLoggedIn && (
            <>
              <NavigationMenu className="z-[99]">
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-accent rounded-full py-1 px-2.5 h-9"
                    hideIcon
                  >
                    <div className="flex justify-between items-center gap-x-2 group">
                      <div className="border border-primary rounded-full p-0.5">
                        <IconChevronDown className="h-4 w-4 transition duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                      <p className="pr-2 text-base">Menu</p>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[240px] p-1">
                      {desktopLeftNavLinks.map((item) => (
                        <NavListItem
                          setOpen={setOpen}
                          key={`desktop-left-nav-item-${item.key}`}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </NavListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            </>
          )}
        </div>
        <div>
          <Link
            href="/"
            variant="basic"
            className="font-relative text-lg xl:text-xl"
          >
            Casa Kind
          </Link>
        </div>
        <div className="w-[calc(50%-75px)] flex items-center justify-end gap-4">
          <>
            <NavigationMenu className="z-[99] h-9" align="end">
              <NavigationMenuItem className="flex items-center">
                <NavigationMenuTrigger
                  className="bg-transparent rounded-full p-0 h-7 xl:h-9"
                  hideIcon
                >
                  <div className="rounded-full h-7 w-7 xl:h-9 xl:w-9 bg-secondary border-2 border-border"></div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl justify-end left-[auto]">
                  <ul className="grid w-[120px] p-1">
                    {(isLoggedIn
                      ? desktopRightSignedInNavLinks
                      : desktopRightSignedOutNavLinks
                    ).map((item) => (
                      <NavListItem
                        key={`desktop-right-nav-item-${item.key}`}
                        title={item.title}
                        href={item.href}
                        onClick={item.onClick}
                        setOpen={setOpen}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </>
        </div>
      </div>
      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button
            asChild
            variant="accent"
            className="md:hidden rounded-full px-2"
          >
            <div className="flex justify-between items-center gap-x-3 group">
              <div className="border border-primary rounded-full p-0.5">
                <IconChevronDown className="h-5 w-5" />
              </div>
              <p className="pr-2">Menu</p>
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="rounded-r-3xl">
          <ul className="list-none flex flex-col justify-start gap-y-3 md:gap-y-4">
            {(isLoggedIn
              ? mobileSignedInNavLinks
              : mobileSignedOutNavLinks
            ).map((item) => (
              <NavListItem
                key={`mobile-nav-item-${item.key}`}
                href={item.href}
                title={item.title}
                onClick={item.onClick}
                setOpen={setOpen}
                navVariant="mobile"
              />
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const desktopNavListItemStyles =
  "w-full block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-accent focus:text-accent-foreground";
const desktopNavListItemTextStyles =
  "text-left text-base font-medium leading-none";
const mobileNavListItemTextStyles =
  "text-left focus:outline-none font-relative tracking-tight text-xl md:text-3xl";

const NavListItem = forwardRef<
  React.ElementRef<"a">,
  Omit<LinkProps, "title" | "href" | "onClick"> &
    NavItem & {
      setOpen: (open: boolean) => void;
      navVariant?: "desktop" | "mobile";
    }
>(
  (
    {
      className,
      title,
      children,
      href,
      setOpen,
      onClick,
      navVariant = "desktop",
      ...props
    },
    ref
  ) => {
    const supabase = createClientComponentClient();
    const router = useRouter();

    async function signOut() {
      await supabase.auth.signOut();
      router.push("/");
    }
    return (
      <li onClick={() => navVariant === "mobile" && setOpen?.(false)}>
        {href && navVariant === "desktop" && (
          <NavigationMenuLink asChild>
            <Link
              variant="basic"
              passHref
              href={href}
              ref={ref}
              containerStyles="w-full"
              className={cn(desktopNavListItemStyles, className)}
              {...props}
            >
              <div className={desktopNavListItemTextStyles}>{title}</div>
              {children && (
                <p className="line-clamp-2 text-sm pt-2 leading-snug text-muted-foreground">
                  {children}
                </p>
              )}
            </Link>
          </NavigationMenuLink>
        )}
        {href && navVariant === "mobile" && (
          <Link
            variant="basic"
            size="lg"
            href={href}
            className={mobileNavListItemTextStyles}
          >
            {title}
          </Link>
        )}
        {onClick === "sign-out" && (
          <button
            key={onClick}
            className={cn(
              ...(navVariant === "desktop"
                ? [desktopNavListItemTextStyles, desktopNavListItemStyles]
                : [mobileNavListItemTextStyles])
            )}
            onClick={signOut}
          >
            {title}
          </button>
        )}
      </li>
    );
  }
);

NavListItem.displayName = "NavListItem";

export { Nav };
