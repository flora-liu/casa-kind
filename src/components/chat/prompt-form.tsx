"use client";

import React from "react";
import { UseChatHelpers } from "ai/react";
import { useRouter } from "next/navigation";
import Textarea from "react-textarea-autosize";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  IconPlus,
  IconRefresh,
  IconReturn,
  IconStop,
} from "@/components/common/icons";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput" | "stop" | "reload"> {
  onSubmit: (value: string) => Promise<void>;
  isLoading: boolean;
}

function PromptForm({
  input,
  setInput,
  onSubmit,
  isLoading,
  stop,
  reload,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!input?.trim()) {
      return;
    }
    setInput("");
    await onSubmit(input);
  };

  return (
    <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
      <form
        className="flex items-start"
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <div className="py-4 flex md:pl-4 gap-x-1.5 md:gap-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.refresh();
              router.push("/chat");
            }}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "h-8 w-8 rounded-full bg-background p-0"
            )}
          >
            <IconPlus />
            <span className="sr-only">New Chat</span>
          </button>
          {isLoading ? (
            <button
              onClick={() => stop()}
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "h-8 w-8 rounded-full bg-background p-0"
              )}
            >
              <IconStop />
              <span className="sr-only">Stop generating</span>
            </button>
          ) : (
            <button
              onClick={() => reload()}
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "h-8 w-8 rounded-full bg-background p-0"
              )}
            >
              <IconRefresh />
              <span className="sr-only">Regenerate response</span>
            </button>
          )}
        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none text-sm md:text-base"
        />
      </form>
      <div className="absolute right-0 top-4 sm:right-4">
        <Button
          onClick={onSubmitHandler}
          size="icon"
          disabled={isLoading || input === ""}
        >
          <IconReturn />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}

export { PromptForm };
