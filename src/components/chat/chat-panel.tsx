import { Message, type UseChatHelpers } from "ai/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { PromptForm } from "@/components/chat/prompt-form";
// import { ButtonScrollToBottom } from '@/components/chat/button-scroll-to-bottom'
import { IconRefresh, IconStop } from "@/components/common/icons";
import { cn } from "@/lib/utils";
// import { FooterText } from '@/components/footer'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  suggestions?: Array<string>;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  suggestions,
}: ChatPanelProps) {
  const onSubmitHandler = async (value: any) => {
    await append({
      id,
      content: value,
      role: "user",
    });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      {/* <ButtonScrollToBottom /> */}
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="border-t bg-background px-4 sm:py-4 shadow-lg sm:rounded-t-xl sm:border">
          {suggestions && suggestions?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 sm:mb-3">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitHandler(suggestion);
                  }}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "rounded-full bg-background"
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <PromptForm
            onSubmit={onSubmitHandler}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            reload={reload}
            stop={stop}
          />
          {/* <FooterText className="hidden sm:block" /> */}
        </div>
      </div>
    </div>
  );
}
