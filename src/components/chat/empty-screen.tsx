import { UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/common/icons";

const examples = [
  {
    heading: "Start now",
    message: `I'm ready to begin.`,
  },
];

export function EmptyScreen({ append }: Pick<UseChatHelpers, "append">) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-3 text-lg font-semibold">Heart Talk</h1>
        <p className="mb-2 leading-normal text-foreground">
          Explore through conversation
        </p>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a safe space for you to explore your feelings. Powered by
          ChatGPT, this conversation experience is designed to help you get to
          know your emotions and practice mindfulness.
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {examples.map((example, index) => (
            <div className="flex items-center" key={index}>
              <IconArrowRight className="mr-2 text-muted-foreground" />
              <Button
                variant="link"
                className="h-auto p-0 text-base"
                onClick={async () => {
                  append({
                    content: example.message,
                    role: "user",
                  });
                }}
              >
                {example.heading}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
