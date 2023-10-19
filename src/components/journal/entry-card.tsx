import { Entry } from "@/lib/types";
import { freeFormTitle } from "@/lib/journal";
import { cn, getDateFormatted } from "@/lib/utils";
import { Button } from "../ui/button";
import { IconOpenEye } from "../common/icons";

interface EntryCardProps {
  entry: Entry;
}
function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="py-6 md:py-8">
      <p className="pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
        {getDateFormatted(new Date(entry.createdAt))}
      </p>
      <p
        className={cn(
          "font-relative tracking-tight text-2xl md:text-3xl",
          entry.createdAt ? "mb-6" : ""
        )}
      >
        {entry.prompt?.prompt?.title || freeFormTitle}
      </p>
      <Button variant="secondary" size="sm" asChild>
        <a href={`/journal/entry/${entry.id}`}>
          <IconOpenEye className="mr-1" />
          <p>View entry</p>
        </a>
      </Button>
    </div>
  );
}

export { EntryCard };
