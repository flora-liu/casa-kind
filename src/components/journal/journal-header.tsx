import { getDateFormatted } from "@/lib/utils";

interface JournalHeaderProps {
  leading?: string;
  title?: string;
  date?: string;
}

export default function JournalHeader({
  leading,
  title,
  date,
}: JournalHeaderProps) {
  return (
    <>
      <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
        {leading}
      </p>
      <p className="font-relative tracking-tight text-2xl md:text-3xl mb-6">
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
