import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const linkVariants = cva(
  "relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
  {
    variants: {
      variant: {
        default: "after:bg-foreground",
        muted: "after:bg-muted-foreground ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean;
}

function Link({ href, children, className, variant, external }: LinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" className="inline-flex">
        <div className={cn(linkVariants({ variant, className }))}>
          {children}
        </div>
      </a>
    );
  }
  return (
    <NextLink href={href || "/"} className="inline-flex">
      <div className={cn(linkVariants({ variant, className }))}>{children}</div>
    </NextLink>
  );
}

export { linkVariants, Link };
