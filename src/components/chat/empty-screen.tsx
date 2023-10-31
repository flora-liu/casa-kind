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
    <div className="mx-auto max-w-2xl px-4 py-3">
      <div className="rounded-lg border p-6 md:p-8 bg-muted">
        <p className="mb-2 leading-normal">
          We offer you a safe space for you to explore your feelings. This chat
          experience is designed to help you get to know your emotions and
          practice mindfulness.
        </p>
        <p className="mb-2 leading-normal">
          You will be guided through an exercise to build emotional awareness.
          Get started by selecting the button or typing a message in the input.
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
                <IconArrowRight className="mr-1" />
                {example.heading}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
