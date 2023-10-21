"use client";

import { useState } from "react";
import { Entry } from "@/lib/types";
import { EntryDisplay } from "@/components/journal/entry-display";
import { EntryForm } from "@/components/journal/entry-form";

interface EntryRendererProps {
  entry?: Entry | null;
  newPromptId?: string;
}

export function EntryRenderer({ entry, newPromptId }: EntryRendererProps) {
  const [isEditing, setIsEditing] = useState<boolean>(
    newPromptId ? true : false
  );

  return (
    <>
      {isEditing ? (
        <EntryForm entry={entry} onCancelEdit={() => setIsEditing(false)} />
      ) : (
        <EntryDisplay entry={entry} onEdit={() => setIsEditing(true)} />
      )}
    </>
  );
}
