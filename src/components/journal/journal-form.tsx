"use client";

import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconCheck } from "../common/icons";

interface FormInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
function FormInput({ input, setInput }: FormInputProps) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  return (
    <div className="py-4 md:py-6 w-full">
      <Textarea
        ref={inputRef}
        tabIndex={0}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your thoughts"
        spellCheck={false}
        className="whitespace-pre-line min-h-[50vh] w-full resize-none rounded-md bg-background p-4 focus-within:outline-none text-sm md:text-base border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  );
}

const category = "Self-discovery";
const prompt = "When do you feel most connected to yourself?";

export default function JournalForm() {
  const [input, setInput] = useState<string>("");
  return (
    <div className="px-5 md:px-0 w-full">
      <Tabs defaultValue="prompt" className="flex flex-col items-center w-full">
        <TabsList className="bg-accent/40">
          <TabsTrigger value="prompt">Prompt of the day</TabsTrigger>
          <TabsTrigger value="freeform">Freeform</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt" className="w-full">
          <p className="pt-4 md:pt-8 pb-2 md:pb-3 leading-normal text-sm md:text-base text-muted-foreground">
            {category}
          </p>
          <p className="font-relative tracking-tight text-2xl md:text-3xl">
            {prompt}
          </p>
          <FormInput input={input} setInput={setInput} />
        </TabsContent>
        <TabsContent value="freeform" className="w-full">
          <FormInput input={input} setInput={setInput} />
        </TabsContent>
      </Tabs>
      <Button size="md" className="flex items-center">
        <IconCheck className="mr-1" />
        I&apos;m finished
      </Button>
    </div>
  );
}
