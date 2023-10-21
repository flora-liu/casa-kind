"use client";

import { useState } from "react";
import {
  EntryDisplay,
  EntryDisplayProps,
} from "@/components/journal/entry-display";
import { EntryForm, EntryFormProps } from "@/components/journal/entry-form";

type EntryRendererProps = {
  hideCancelButton?: boolean;
} & EntryFormProps &
  EntryDisplayProps;

export function EntryRenderer({
  entry,
  newPromptId,
  hideCancelButton,
  // EntryFormProps
  className,
  textareaStyles,
  onCancelEdit,
  // EntryDisplayProps
  deleteLink,
}: EntryRendererProps) {
  const [isEditing, setIsEditing] = useState<boolean>(
    entry ? false : newPromptId ? true : false
  );

  return (
    <>
      {isEditing ? (
        <EntryForm
          newPromptId={newPromptId}
          className={className}
          entry={entry}
          onCancelEdit={
            hideCancelButton
              ? undefined
              : () => (onCancelEdit ? onCancelEdit() : setIsEditing(false))
          }
          textareaStyles={textareaStyles}
        />
      ) : (
        <EntryDisplay
          className={className}
          entry={entry}
          textareaStyles={textareaStyles}
          onEdit={() => setIsEditing(true)}
          deleteLink={deleteLink}
        />
      )}
    </>
  );
}
