"use client";

import { useState } from "react";
import Textarea from "react-textarea-autosize";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconCheck } from "../common/icons";
import { Category, Prompt } from "@/lib/types";

interface JournalFormProps {
  promptOfTheDay?: {
    prompt?: Prompt;
    category?: Category;
  } | null;
  selectedPrompt?: {
    prompt?: Prompt;
    category?: Category;
  } | null;
}

export default function JournalForm({
  promptOfTheDay,
  selectedPrompt,
}: JournalFormProps) {
  const [input, setInput] = useState<string>("");

  return (
    <div className="px-5 md:px-0 w-full">
      <Tabs
        defaultValue={
          selectedPrompt?.prompt
            ? "prompt"
            : promptOfTheDay
            ? "prompt-of-the-day"
            : "freeform"
        }
        className="flex flex-col items-center w-full"
      >
        <TabsList className="bg-accent/40">
          {selectedPrompt?.prompt && (
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
          )}
          {promptOfTheDay?.prompt && (
            <TabsTrigger value="prompt-of-the-day">
              Prompt of the day
            </TabsTrigger>
          )}
          <TabsTrigger value="freeform">Freeform</TabsTrigger>
        </TabsList>
        {selectedPrompt?.prompt && (
          <TabsContent value="prompt" className="w-full">
            {selectedPrompt?.category?.title && (
              <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
                {selectedPrompt?.category?.title}
              </p>
            )}
            <p className="font-relative tracking-tight text-2xl md:text-3xl">
              {selectedPrompt?.prompt.title}
            </p>
          </TabsContent>
        )}
        {promptOfTheDay?.prompt && (
          <TabsContent value="prompt-of-the-day" className="w-full">
            {promptOfTheDay?.category?.title && (
              <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
                {promptOfTheDay?.category?.title}
              </p>
            )}
            <p className="font-relative tracking-tight text-2xl md:text-3xl">
              {promptOfTheDay.prompt.title}
            </p>
          </TabsContent>
        )}
        <TabsContent value="freeform" className="w-full">
          <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
            Stream of consciousness
          </p>
          <p className="font-relative tracking-tight text-2xl md:text-3xl">
            What&apos;s on your mind? How is your heart?
          </p>
        </TabsContent>
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
      </Tabs>
      <Button size="md" className="flex items-center">
        <IconCheck className="mr-1" />
        I&apos;m finished
      </Button>
    </div>
  );
}
