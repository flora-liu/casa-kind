import { calculateTimeAgo, cn } from "@/lib/utils";

type EntryHeaderProps = {
  leading?: string;
  title?: string;
  date?: string;
  titleStyles?: string;
} & React.ComponentProps<"div">;

export function EntryHeader({
  leading,
  title,
  date,
  className,
  titleStyles = "text-2xl md:text-3xl",
  ...props
}: EntryHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start px-5 md:px-0 w-full py-2",
        className
      )}
      {...props}
    >
      <div className="flex gap-x-2 pb-1 md:pb-2 items-center">
        <p className="leading-normal text-sm text-muted-foreground">
          {leading}
        </p>
        {date && (
          <div className="text-sm text-muted-foreground/60">
            <p>{calculateTimeAgo(date)}</p>
          </div>
        )}
      </div>
      <p className={cn("font-relative tracking-tight", titleStyles)}>{title}</p>
    </div>
  );
}
