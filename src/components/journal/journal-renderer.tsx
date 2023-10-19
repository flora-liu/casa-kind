"use client";

import { Entry } from "@/lib/types";
import JournalDisplay from "@/components/journal/journal-display";
import JournalForm from "@/components/journal/journal-form";
import { useState } from "react";

interface JournalRendererProps {
  entry?: Entry | null;
}

export default function JournalRenderer({ entry }: JournalRendererProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  if (!entry) {
    return null;
  }
  return (
    <>
      {isEditing ? (
        <JournalForm entry={entry} onCancelEdit={() => setIsEditing(false)} />
      ) : (
        <JournalDisplay entry={entry} onEdit={() => setIsEditing(true)} />
      )}
    </>
  );
}
