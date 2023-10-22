"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database/types";
import { useAuthContext } from "@/components/common/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  IconCross,
  IconPencil,
  IconArrowLeft,
} from "@/components/common/icons";
import { Entry } from "@/lib/types";
import { cn } from "@/lib/utils";

export type EntryDisplayProps = {
  entry?: Entry | null;
  onEdit?: () => void;
  textareaStyles?: string;
  deleteLink?: string;
} & React.ComponentProps<"div">;

export function EntryDisplay({
  entry,
  onEdit,
  textareaStyles,
  className,
}: EntryDisplayProps) {
  const supabase = createClientComponentClient<Database>();
  const { userId } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  if (!entry) {
    return null;
  }

  async function deleteEntry() {
    if (!userId || !entry?.id) {
      return;
    }
    const { error } = await supabase.from("entry").delete().eq("id", entry.id);
    if (error) {
      setError(error?.message);
    } else {
      router.push("/journal/entries");
    }
  }

  return (
    <div className={cn("px-5 md:px-0 w-full", className)}>
      <div className="py-2 md:py-4 w-full">
        <p
          className={cn(
            "whitespace-pre-line min-h-[18rem] md:min-h-[24rem] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input/60 ring-offset-background",
            textareaStyles
          )}
        >
          {entry.content}
        </p>
      </div>
      {error && (
        <div className="flex flex-col items-start mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      <div className="flex justify-between gap-2">
        <div className="flex flex-row gap-2">
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
          <Button
            variant="outline"
            size="md"
            className="flex items-center"
            onClick={() => deleteEntry()}
          >
            <IconCross className="mr-1 rotate-45" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
