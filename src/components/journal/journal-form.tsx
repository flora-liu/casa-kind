"use client";

import { useState } from "react";
import Textarea from "react-textarea-autosize";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconCheck, IconCross } from "@/components/common/icons";
import { Category, Entry, Prompt } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database/types";
import { useAuthContext } from "@/components/common/auth-provider";
import { getDateFormatted } from "@/lib/utils";
import { useRouter } from "next/navigation";
import JournalHeader from "@/components/journal/journal-header";

enum EntryMode {
  PromptOfTheDay = "prompt-of-the-day",
  Prompt = "prompt",
  FreeForm = "free-form",
  Edit = "edit",
}

interface JournalFormProps {
  promptOfTheDay?: {
    prompt?: Prompt;
    category?: Category;
  } | null;
  selectedPrompt?: {
    prompt?: Prompt;
    category?: Category;
  } | null;
  entry?: Entry | null;
  onCancelEdit?: () => void;
}

export default function JournalForm({
  promptOfTheDay,
  selectedPrompt,
  entry,
  onCancelEdit,
}: JournalFormProps) {
  const [mode, setMode] = useState<string>(
    entry
      ? EntryMode.Edit
      : selectedPrompt
      ? EntryMode.Prompt
      : promptOfTheDay
      ? EntryMode.PromptOfTheDay
      : EntryMode.FreeForm
  );
  const [input, setInput] = useState<string>(entry?.content || "");
  const [error, setError] = useState<string | undefined>();
  const supabase = createClientComponentClient<Database>();
  const { userId } = useAuthContext();
  const router = useRouter();

  async function createJournalEntry() {
    if (!userId) {
      return;
    }
    setError(undefined);
    let promptId: string | undefined = undefined;
    if (mode === EntryMode.PromptOfTheDay) {
      promptId = promptOfTheDay?.prompt?.id;
    } else if (mode === EntryMode.Prompt) {
      promptId = selectedPrompt?.prompt?.id;
    }
    const { data, error } = await supabase
      .from("entry")
      .insert({
        content: input,
        userId,
        ...(promptId && { promptId }),
      })
      .select()
      .single();
    if (error) {
      setError(error?.message);
    }
    if (data) {
      router.push(`/journal/entry/${data.id}`);
    }
  }

  async function updateJournalEntry() {
    if (!userId || !entry?.id) {
      return;
    }
    setError(undefined);
    const { data, error } = await supabase
      .from("entry")
      .upsert({
        content: input,
        userId,
        id: entry.id,
      })
      .select()
      .single();
    if (error) {
      setError(error?.message);
    }
    if (data) {
      onCancelEdit?.();
      router.push(`/journal/entry/${data.id}`);
    }
  }

  return (
    <div className="px-5 md:px-0 w-full">
      <Tabs
        defaultValue={mode}
        value={mode}
        onValueChange={(mode: string) => setMode(mode)}
        className="flex flex-col items-center w-full"
      >
        {!entry && (
          <TabsList className="bg-accent/40">
            {selectedPrompt?.prompt && (
              <TabsTrigger value={EntryMode.Prompt}>Prompt</TabsTrigger>
            )}
            {promptOfTheDay?.prompt && (
              <TabsTrigger value={EntryMode.PromptOfTheDay}>
                Prompt of the day
              </TabsTrigger>
            )}
            <TabsTrigger value={EntryMode.FreeForm}>Free form</TabsTrigger>
          </TabsList>
        )}
        {selectedPrompt?.prompt && (
          <TabsContent value={EntryMode.Prompt} className="w-full">
            <JournalHeader
              leading={selectedPrompt?.category?.title}
              title={selectedPrompt?.prompt?.title}
            />
          </TabsContent>
        )}
        {promptOfTheDay?.prompt && (
          <TabsContent value={EntryMode.PromptOfTheDay} className="w-full">
            <JournalHeader
              leading={promptOfTheDay?.category?.title}
              title={promptOfTheDay.prompt.title}
            />
          </TabsContent>
        )}
        <TabsContent value={EntryMode.FreeForm} className="w-full">
          <JournalHeader
            leading="Stream of consciousness"
            title="What's on your mind? How is your heart?"
          />
        </TabsContent>
        {entry && (
          <TabsContent value={EntryMode.Edit} className="w-full">
            <JournalHeader
              leading={entry?.prompt?.category?.title || "Free form"}
              title={entry?.prompt?.title || "Journal entry"}
              date={entry.createdAt}
            />
          </TabsContent>
        )}
      </Tabs>
      <div className="py-4 md:py-6 w-full">
        <Textarea
          tabIndex={0}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your thoughts"
          spellCheck={false}
          className="whitespace-pre-line min-h-[50vh] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
      {error && (
        <div className="flex flex-col items-start mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      <div className="flex gap-4 justify-between">
        <Button
          size="md"
          className="flex items-center"
          onClick={() => {
            if (entry?.id) {
              updateJournalEntry();
            } else {
              createJournalEntry();
            }
          }}
        >
          <IconCheck className="mr-1" />
          Save
        </Button>
        {onCancelEdit && (
          <Button
            size="md"
            variant="secondary"
            className="flex items-center"
            onClick={onCancelEdit}
          >
            <IconCross className="mr-1" />
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
