"use client";

import { useState } from "react";
import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { IconCheck, IconCross, IconLoading } from "@/components/common/icons";
import { Entry } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database/types";
import { useAuthContext } from "@/components/common/auth-provider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { parseEntry } from "@/lib/journal";
import { journalEntry } from "@/lib/routes";

export type EntryFormProps = {
  newPromptId?: string;
  entry?: Entry | null;
  onCancelEdit?: () => void;
  onCancelEditLink?: string;
  textareaStyles?: string;
  onCreateRefresh?: boolean;
  onUpdate?: (entry: Entry) => void;
  createdAt?: string;
} & React.ComponentProps<"div">;

export function EntryForm({
  newPromptId,
  entry,
  onCancelEdit,
  onCancelEditLink,
  className,
  textareaStyles,
  onCreateRefresh,
  onUpdate,
  createdAt,
}: EntryFormProps) {
  const [input, setInput] = useState<string>(entry?.content || "");
  const [error, setError] = useState<string | undefined>();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useAuthContext();
  const router = useRouter();

  async function createEntry() {
    if (!userId) {
      return;
    }
    setError(undefined);
    const newEntryData = {
      content: input,
      user_id: userId,
      ...(newPromptId && { prompt_id: newPromptId }),
      ...(createdAt && { created_at: createdAt }),
    };
    const { data, error } = await supabase
      .from("entry")
      .insert(newEntryData)
      .select()
      .single();
    setIsLoading(false);
    if (error) {
      setError(error?.message);
    }
    if (data) {
      if (onCreateRefresh) {
        router.refresh();
      } else {
        router.push(`${journalEntry.href}/${data.id}`);
      }
      setIsLoading(false);
      onCancelEdit?.();
    }
  }

  async function updateEntry() {
    if (!userId || !entry?.id) {
      return;
    }
    setError(undefined);
    const { data, error } = await supabase
      .from("entry")
      .upsert({
        content: input,
        user_id: userId,
        id: entry.id,
      })
      .select(
        `
        *,
        prompt (
          *,
          _category_to_prompt (
            category (id, title, slug)
          )
        )
      `
      )
      .single();
    if (error) {
      setError(error?.message);
    }
    if (data) {
      setIsLoading(false);
      onCancelEdit?.();
      router.refresh();
      const entry = parseEntry(data || null);
      if (entry) {
        onUpdate?.(entry);
      }
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-y-3 md:gap-y-4 py-2 md:py-4 px-5 md:px-0 w-full",
        className
      )}
    >
      <Textarea
        tabIndex={0}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your thoughts"
        spellCheck={false}
        className={cn(
          "whitespace-pre-line min-h-[12rem] md:min-h-[20rem] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          textareaStyles
        )}
      />
      {error && (
        <div className="flex flex-col items-start">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      <div className="flex gap-4 justify-between">
        <Button
          disabled={!input}
          size="md"
          className="flex items-center"
          onClick={() => {
            setIsLoading(true);
            if (entry?.id) {
              updateEntry();
            } else {
              createEntry();
            }
          }}
        >
          {isLoading ? (
            <>
              <IconLoading className="mr-1" />
              Saving
            </>
          ) : (
            <>
              <IconCheck className="mr-1" />
              Save
            </>
          )}
        </Button>
        {onCancelEdit && (
          <Button
            size="md"
            variant="secondary"
            className="flex items-center"
            onClick={onCancelEdit}
          >
            <IconCross className="mr-1 rotate-45" />
            Cancel
          </Button>
        )}
        {onCancelEditLink && (
          <Button size="md" variant="secondary" asChild>
            <a href={onCancelEditLink} className="flex items-center">
              <IconCross className="mr-1 rotate-45" />
              Cancel
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
