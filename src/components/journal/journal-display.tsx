import { Button } from "@/components/ui/button";
import { IconPencil } from "../common/icons";
import { Entry } from "@/lib/types";
import { getDateFormatted } from "@/lib/utils";
import JournalHeader from "./journal-header";

interface JournalDisplayProps {
  entry?: Entry | null;
  onEdit?: () => void;
}

export default function JournalDisplay({ entry, onEdit }: JournalDisplayProps) {
  if (!entry) {
    return null;
  }
  return (
    <div className="px-5 md:px-0 w-full">
      <div className="pt-2">
        <JournalHeader
          leading={entry?.prompt?.category?.title || "Free form"}
          title={entry?.prompt?.title || "Journal entry"}
          date={entry.createdAt}
        />
      </div>
      <div className="py-4 md:py-6 w-full">
        <p className="whitespace-pre-line min-h-[50vh] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input/60 ring-offset-background">
          {entry.content}
        </p>
      </div>
      {onEdit && (
        <Button
          variant="outline"
          size="md"
          className="flex items-center"
          onClick={onEdit}
        >
          <IconPencil className="mr-1" />
          Edit
        </Button>
      )}
    </div>
  );
}
