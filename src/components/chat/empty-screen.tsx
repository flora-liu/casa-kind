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
      <div className="rounded-lg border p-8 bg-muted">
        <h1 className="mb-3 text-xl font-semibold">Heart Talk</h1>
        <p className="mb-6 leading-normal text-muted-foreground">
          Explore through conversation
        </p>
        <p className="mb-2 leading-normal">
          This is a safe space for you to explore your feelings. Powered by
          ChatGPT, this experience is designed to help you get to know your
          emotions and practice mindfulness.
        </p>
        <p className="mb-2 leading-normal">
          You will be guided through an exercise to build emotional awareness.
          Get started by selecting the button or typing a message in the input.
          You will be lead through multiple instructions inviting you to be
          aware of your emotions.
        </p>
        <div className="mt-6 flex flex-col items-start space-y-2">
          {examples.map((example, index) => (
            <div className="flex items-center" key={index}>
              <Button
                variant="default"
                size="md"
                onClick={async () => {
                  append({
                    content: example.message,
                    role: "user",
                  });
                }}
              >
                {example.heading}
                <IconArrowRight className="ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
