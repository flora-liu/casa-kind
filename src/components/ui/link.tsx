import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const linkVariants = cva(
  "relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
  {
    variants: {
      variant: {
        default: "after:bg-foreground",
        muted: "text-muted-foreground after:bg-muted-foreground ",
        basic: "after:h-0 hover:text-muted-foreground",
      },
      size: {
        default: "text-sm",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps &
  VariantProps<typeof linkVariants> & {
    external?: boolean;
    containerStyles?: string;
  };

const Link = forwardRef<React.ElementRef<"a">, LinkProps>(
  ({ href, children, className, variant, external, containerStyles }, ref) => {
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          className={cn("inline-flex", containerStyles)}
        >
          <div className={cn(linkVariants({ variant, className }))}>
            {children}
          </div>
        </a>
      );
    }
    return (
      <NextLink
        ref={ref}
        href={href || "/"}
        className={cn("inline-flex", containerStyles)}
      >
        <div className={cn(linkVariants({ variant, className }))}>
          {children}
        </div>
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export { linkVariants, Link };
