"use client";

import { useEffect, useState } from "react";
import {
  EntryDisplay,
  EntryDisplayProps,
} from "@/components/journal/entry-display";
import { EntryForm, EntryFormProps } from "@/components/journal/entry-form";
import { Entry } from "@/lib/types";

type EntryRendererProps = EntryFormProps & EntryDisplayProps;

export function EntryRenderer({
  entry,
  newPromptId,
  // EntryFormProps
  className,
  textareaStyles,
  onCreateRefresh,
  onUpdate,
  // EntryDisplayProps
  onDeleteLink,
  onDelete,
}: EntryRendererProps) {
  const [isEditing, setIsEditing] = useState<boolean>(
    entry ? false : newPromptId ? true : false
  );

  useEffect(() => {
    setIsEditing(entry ? false : true);
  }, [entry]);

  return (
    <>
      {isEditing ? (
        <EntryForm
          newPromptId={newPromptId}
          className={className}
          entry={entry}
          onCancelEdit={entry ? () => setIsEditing(false) : undefined}
          textareaStyles={textareaStyles}
          onCreateRefresh={onCreateRefresh}
          onUpdate={onUpdate}
        />
      ) : (
        <EntryDisplay
          className={className}
          entry={entry}
          textareaStyles={textareaStyles}
          onEdit={() => setIsEditing(true)}
          onDeleteLink={onDeleteLink}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
