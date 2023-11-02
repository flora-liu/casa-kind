import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function Layout({
  title,
  subtitle,
  children,
  headerNav,
  className,
  ...props
}: {
  title?: string;
  subtitle?: string;
  headerNav?: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "h-[calc(100vh-85px)] w-full flex flex-col justify-start items-center",
        className
      )}
      {...props}
    >
      <div className="relative mx-auto flex flex-col items-start justify-start w-full px-6 md:px-8">
        <div className="pt-2 w-full flex justify-between flex-col gap-4 md:gap-6 md:flex-row">
          <p className="flex flex-col sm:flex-row sm:items-center">
            {title && (
              <span
                className={cn(
                  "font-medium",
                  subtitle ? "mr-2 mb-2 md:mb-0" : ""
                )}
              >
                {title}
              </span>
            )}
            {subtitle && (
              <span className="mb-2 sm:mb-0 leading-normal text-muted-foreground/80 text-sm sm:text-base">
                {subtitle}
              </span>
            )}
          </p>
          {headerNav}
        </div>
      </div>
      {(title || subtitle) && <Separator className="my-4" />}
      {children}
    </div>
  );
}

function Section({
  title,
  children,
  headerRight,
  className,
  innerStyles,
  ...props
}: {
  title?: string;
  headerRight?: React.ReactNode;
  innerStyles?: string;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative mx-auto sm:max-w-3xl md:max-w-6xl w-full flex flex-col",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "md:px-8 p-6 md:p-6 flex flex-col gap-y-4 md:gap-y-5",
          innerStyles
        )}
      >
        {(title || headerRight) && (
          <div className="flex justify-between items-center">
            <div>
              {title && (
                <h3 className="text-base md:text-lg font-semibold">{title}</h3>
              )}
            </div>
            {headerRight}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export { Layout, Section };
