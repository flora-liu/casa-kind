import { Entry } from "@/lib/types";
import { IconPlus, IconTokens } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { EntryDisplay } from "@/components/journal/entry-display";
import { Separator } from "@/components/ui/separator";
import { EntryCard } from "./entry-card";

export interface EntryListProps {
  entries: Array<Entry>;
}

export function EntryList({ entries }: EntryListProps) {
  return (
    <div className="my-16 min-h-screen w-full flex flex-col justify-start items-center">
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl flex flex-col items-start justify-start w-full px-6 py-4 md:px-8 md:py-6">
        <div className="pt-4 md:pt-6 w-full flex justify-start gap-8 md:justify-end">
          <div className="flex flex-row gap-2">
            <Button className="md:order-2 order-1" asChild>
              <a href="/journal/entry/new" className="flex items-center">
                <IconPlus className="mr-1" />
                New entry
              </a>
            </Button>
            <Button className="md:order-1 order-2" variant="outline" asChild>
              <a href="/journal" className="flex items-center">
                <IconTokens className="mr-1" />
                View prompts
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl p-6 md:p-8 w-full flex flex-col">
        {entries &&
          entries?.map((entry, index) => {
            return (
              <div key={index}>
                <EntryCard entry={entry} />
                {index < entries.length - 1 && (
                  <Separator className="my-4 md:my-8" />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
