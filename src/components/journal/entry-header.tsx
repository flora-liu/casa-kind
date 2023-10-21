import { cn, getDateFormatted } from "@/lib/utils";

type EntryHeaderProps = {
  leading?: string;
  title?: string;
  date?: string;
} & React.ComponentProps<"div">;

export function EntryHeader({
  leading,
  title,
  date,
  className,
  ...props
}: EntryHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start px-5 md:px-0 w-full py-3",
        className
      )}
      {...props}
    >
      <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
        {leading}
      </p>
      <p
        className={cn(
          "font-relative tracking-tight text-2xl md:text-3xl",
          date ? "mb-6" : ""
        )}
      >
        {title}
      </p>
      {date && (
        <div className="text-muted-foreground text-sm">
          <p>{getDateFormatted(new Date(date))}</p>
        </div>
      )}
    </div>
  );
}
