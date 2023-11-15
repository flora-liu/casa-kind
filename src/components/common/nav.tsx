"use client";

import { forwardRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Link, LinkProps } from "@/components/ui/link";

import { IconChevronDown } from "@/components/common/icons";
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
import {
  account,
  appName,
  heartTalk,
  homeBase,
  journal,
  meditate,
  signIn,
  signOut,
  signUp,
} from "@/lib/routes";

interface NavItem {
  key: string;
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  href?: string; // Link
  description?: string;
  onClick?: string; // Button
}

const leftNavLinks: Array<NavItem> = [homeBase, journal, heartTalk, meditate];

const signOutButtonBase = {
  ...signOut,
  href: undefined,
  onClick: "sign-out",
};

const signedInRightNavLinks: Array<NavItem> = [
  account,
  {
    ...signOutButtonBase,
    icon: signOut.icon,
  },
];

const signedOutRightNavLinks: Array<NavItem> = [signIn, signUp];

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
      <div className="flex justify-between items-center w-full m-auto list-none">
        <div className="w-[calc(50%-75px)] flex items-center gap-4">
          {isLoggedIn && (
            <>
              {/* Desktop menu */}
              <div className="hidden md:block">
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
                        {leftNavLinks.map((item) => (
                          <NavListItem
                            setOpen={setOpen}
                            key={`desktop-left-nav-item-${item.key}`}
                            title={item.title}
                            href={item.href}
                            description={item.description}
                            icon={item.icon}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenu>
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
                    {signedInRightNavLinks.map((item) => (
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
            </>
          )}
        </div>
        <div>
          <Link
            href="/"
            variant="basic"
            className="font-relative text-lg xl:text-xl"
          >
            {appName}
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
                  <div className="rounded-full h-7 w-7 xl:h-9 xl:w-9 bg-secondary dark:bg-accent dark:border-primary/60 border-2 border-border"></div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl justify-end left-[auto]">
                  <ul className="grid w-[120px] p-1">
                    {(isLoggedIn
                      ? signedInRightNavLinks
                      : signedOutRightNavLinks
                    ).map((item) => (
                      <NavListItem
                        key={`desktop-right-nav-item-${item.key}`}
                        title={item.title}
                        href={item.href}
                        onClick={item.onClick}
                        setOpen={setOpen}
                        icon={item.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </>
        </div>
      </div>
    </div>
  );
}

const desktopNavListItemStyles =
  "w-full block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground";
const desktopNavListItemTextStyles =
  "text-left text-base font-medium leading-none";
const mobileNavListItemTextStyles =
  "text-left focus:outline-none font-relative tracking-tight text-xl md:text-3xl";

type NavListItemProps = Omit<LinkProps, "title" | "href" | "onClick"> &
  NavItem & {
    setOpen: (open: boolean) => void;
    navVariant?: "desktop" | "mobile";
  };

const NavListItem = forwardRef<React.ElementRef<"a">, NavListItemProps>(
  (
    {
      className,
      title,
      children,
      href,
      setOpen,
      icon,
      description,
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
              className={cn(
                desktopNavListItemStyles,
                desktopNavListItemTextStyles,
                className
              )}
              {...props}
            >
              <InnerNavListItem
                icon={icon}
                title={title}
                description={description}
              />
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
            <InnerNavListItem
              icon={icon}
              title={title}
              description={description}
            />
          </button>
        )}
      </li>
    );
  }
);

NavListItem.displayName = "NavListItem";

const InnerNavListItem = ({
  icon,
  title,
  description,
}: Pick<NavListItemProps, "icon" | "title" | "description">) => (
  <div className="flex items-start gap-3">
    {icon && <div>{icon}</div>}
    <div className="flex flex-col items-start">
      <p>{title}</p>
      {description && (
        <p className="line-clamp-2 text-sm pt-2 leading-snug text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  </div>
);

export { Nav };
