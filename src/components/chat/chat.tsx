import { useChat, Message } from "ai/react";
import { cn } from "@/lib/utils";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ChatList } from "@/components/chat/chat-list";
import { EmptyScreen } from "@/components/chat/empty-screen";
import { ChatScrollAnchor } from "@/components/chat/chat-scroll-anchor";
import { useState } from "react";
import { getAssistantSuggestions } from "@/lib/chat";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Array<Message>;
  id?: string;
}

function Chat({ id, initialMessages, className }: ChatProps) {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        setSuggestions([]);
        if (response.status === 401) {
          //   toast.error(response.statusText)
        }
      },
      onFinish(message) {
        const suggestions = getAssistantSuggestions(message);
        if (suggestions && suggestions?.length > 0) {
          setSuggestions(suggestions);
        } else {
          setSuggestions([]);
        }
      },
    });

  return (
    <>
      <div
        className={cn(
          "pt-20 md:pt-10",
          className,
          suggestions?.length > 0 ? "pb-[300px]" : "pb-[200px]"
        )}
      >
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen append={append} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        suggestions={suggestions}
      />
    </>
  );
}

export { Chat };
