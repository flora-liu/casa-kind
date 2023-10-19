import { cn, getDateFormatted } from "@/lib/utils";

interface EntryHeaderProps {
  leading?: string;
  title?: string;
  date?: string;
}

export default function EntryHeader({
  leading,
  title,
  date,
}: EntryHeaderProps) {
  return (
    <>
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
    </>
  );
}
