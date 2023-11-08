import { Entry } from "@/lib/types";
import { freeFormTitle } from "@/lib/journal";
import { cn, getDateFormatted } from "@/lib/utils";
import { Button } from "../ui/button";
import { IconOpenEye } from "../common/icons";
import { journalEntry } from "@/lib/routes";

interface EntryCardProps {
  entry: Entry;
}
function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="p-3 md:py-6 border border-border rounded-lg md:px-5 bg-card">
      <p className="pb-4 md:pb-5 leading-normal text-xs sm:text-sm md:text-base text-muted-foreground">
        {getDateFormatted(new Date(entry.createdAt))}
      </p>
      <p
        className={cn(
          "font-relative tracking-tight text-lg sm:text-2xl md:text-3xl",
          entry.createdAt ? "mb-4 md:mb-6" : ""
        )}
      >
        {entry.prompt?.prompt?.title || freeFormTitle}
      </p>
      <Button variant="secondary" size="sm" asChild>
        <a href={`${journalEntry.href}/${entry.id}`}>
          <IconOpenEye className="mr-1" />
          <p>View entry</p>
        </a>
      </Button>
    </div>
  );
}

export { EntryCard };
