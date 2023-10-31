"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { EntryHeader } from "@/components/journal/entry-header";
import { Category, Prompt } from "@/lib/types";
import { EntryForm } from "@/components/journal/entry-form";

enum EntryMode {
  PromptOfTheDay = "prompt-of-the-day",
  Prompt = "prompt",
  FreeForm = "free-form",
  Edit = "edit",
}

interface NewEntryProps {
  promptOfTheDay?: {
    prompt?: Prompt;
    category?: Category;
  } | null;
  selectedPrompt?: {
    prompt?: Prompt;
    category?: Category;
  } | null;
}

function NewEntry({ selectedPrompt, promptOfTheDay }: NewEntryProps) {
  const [mode, setMode] = useState<string>(
    selectedPrompt
      ? EntryMode.Prompt
      : promptOfTheDay
      ? EntryMode.PromptOfTheDay
      : EntryMode.FreeForm
  );

  return (
    <>
      <Tabs
        defaultValue={mode}
        value={mode}
        onValueChange={(mode: string) => setMode(mode)}
        className="flex flex-col items-start sm:items-center w-full px-5 md:px-0 mt-3 md:mt-0"
      >
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
      </Tabs>
      <EntryHeader
        className="mt-6"
        leading={
          mode == EntryMode.Prompt
            ? selectedPrompt?.category?.title
            : mode == EntryMode.PromptOfTheDay
            ? promptOfTheDay?.category?.title
            : "Stream of consciousness"
        }
        title={
          mode == EntryMode.Prompt
            ? selectedPrompt?.prompt?.title
            : mode == EntryMode.PromptOfTheDay
            ? promptOfTheDay?.prompt?.title
            : "What's on your mind? How is your heart?"
        }
      />
      <EntryForm
        newPromptId={
          mode == EntryMode.Prompt
            ? selectedPrompt?.prompt?.id
            : mode == EntryMode.PromptOfTheDay
            ? promptOfTheDay?.prompt?.id
            : undefined
        }
      />
    </>
  );
}

export { NewEntry };
