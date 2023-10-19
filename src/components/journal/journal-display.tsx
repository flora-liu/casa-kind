import { Button } from "@/components/ui/button";
import { IconPencil } from "../common/icons";
import { Entry } from "@/lib/types";
import { getDateFormatted } from "@/lib/utils";

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
      <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
        {entry?.prompt?.category ? entry.prompt.category?.title : "Free form"}
      </p>
      <p className="font-relative tracking-tight text-2xl md:text-3xl mb-6">
        {entry?.prompt?.title ? entry.prompt.title : "Journal entry"}
      </p>
      <div className="text-muted-foreground text-sm">
        <p>{getDateFormatted(new Date(entry.createdAt))}</p>
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
