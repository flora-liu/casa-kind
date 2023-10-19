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
import { EntryHeader } from "@/components/journal/entry-header";
import { freeFormCategory, freeFormTitle } from "@/lib/journal";

interface EntryDisplayProps {
  entry?: Entry | null;
  onEdit?: () => void;
}

export function EntryDisplay({ entry, onEdit }: EntryDisplayProps) {
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
    <div className="px-5 md:px-0 w-full">
      <div className="pt-2">
        <EntryHeader
          leading={entry?.prompt?.category?.title || freeFormCategory}
          title={entry?.prompt?.prompt?.title || freeFormTitle}
          date={entry.createdAt}
        />
      </div>
      <div className="py-4 md:py-6 w-full">
        <p className="whitespace-pre-line min-h-[40vh] md:min-h-[45vh] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input/60 ring-offset-background">
          {entry.content}
        </p>
      </div>
      {error && (
        <div className="flex flex-col items-start mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      <div className="flex justify-between gap-2">
        <Button variant="outline" size="md" className="flex items-center">
          <a className="flex items-center" href="/journal/entries">
            <IconArrowLeft className="mr-1" />
            Back
          </a>
        </Button>
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
            <IconCross className="mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
