"use client";

import { useState } from "react";
import { Entry } from "@/lib/types";
import { EntryDisplay } from "@/components/journal/entry-display";
import { EntryForm } from "@/components/journal/entry-form";

interface EntryRendererProps {
  entry?: Entry | null;
}

export function EntryRenderer({ entry }: EntryRendererProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!entry) {
    return null;
  }

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
