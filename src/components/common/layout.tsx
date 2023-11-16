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
      <div className="relative mx-auto flex flex-col items-center justify-start w-full">
        {(title || subtitle) && (
          <>
            <div className="px-5 md:px-8 w-full">
              <div className="full flex justify-between flex-col gap-4 md:gap-6 lg:flex-row">
                <p className="hidden md:flex flex-col sm:flex-row sm:items-center">
                  {title && (
                    <span
                      className={cn(
                        "font-medium",
                        subtitle ? "mr-2 mb-2 sm:mb-0" : ""
                      )}
                    >
                      {title}
                    </span>
                  )}
                  {subtitle && (
                    <span className="hidden md:block mb-2 sm:mb-0 leading-normal text-muted-foreground/80 text-sm sm:text-base">
                      {subtitle}
                    </span>
                  )}
                </p>
                {headerNav}
              </div>
            </div>
            <Separator className="my-4" />
          </>
        )}
      </div>
      <div className="relative mx-auto flex flex-col items-center justify-start w-full">
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  headerRight,
  className,
  innerStyles,
  outerStyles,
  ...props
}: {
  title?: string;
  headerRight?: React.ReactNode;
  innerStyles?: string;
  outerStyles?: string;
} & React.ComponentProps<"div">) {
  return (
    <div className={cn("relative mx-auto w-full", outerStyles)}>
      <div
        className={cn(
          "relative mx-auto sm:max-w-3xl md:max-w-7xl w-full flex flex-col",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "md:px-8 p-6 flex flex-col gap-y-4 md:gap-y-5",
            innerStyles
          )}
        >
          {(title || headerRight) && (
            <div className="flex justify-between items-center">
              <div>
                {title && (
                  <h3 className="text-base md:text-lg font-semibold">
                    {title}
                  </h3>
                )}
              </div>
              {headerRight}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export { Layout, Section };
