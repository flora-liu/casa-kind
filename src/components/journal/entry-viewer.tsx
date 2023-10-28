"use client";

import { cn } from "@/lib/utils";
import { freeFormCategory, freeFormTitle } from "@/lib/journal";
import { EntryHeader } from "@/components/journal/entry-header";
import { Entry } from "@/lib/types";
import { useState } from "react";
import { EntryRenderer } from "@/components/journal/entry-renderer";
import { Separator } from "@/components/ui/separator";

export function EntryViewer({ entries }: { entries: Array<Entry> }) {
  const [currentEntry, setCurrentEntry] = useState<number | null>(
    entries?.length > 0 ? 0 : null
  );
  return (
    <div className="w-full md:grid-cols-12 md:grid sm:max-w-3xl md:max-w-6xl mt-3">
      <div className="md:col-span-4 md:h-[75vh] md:overflow-y-scroll flex flex-col gap-y-2">
        {entries?.map((entry, index) => {
          return (
            <div
              key={index}
              className={cn(
                "w-full rounded-lg md:hover:bg-accent/10",
                index === currentEntry
                  ? "md:bg-accent/20 md:hover:bg-accent/20"
                  : "",
                index === entries?.length - 1 ? "mb-8 md:mb-4" : ""
              )}
            >
              <div>
                <button
                  className="px-5 pb-1 md:p-4 w-full"
                  onClick={() => setCurrentEntry(index)}
                >
                  <EntryHeader
                    className="px-0 pb-0"
                    date={entry?.createdAt}
                    title={entry?.prompt?.prompt?.title || freeFormTitle}
                    leading={entry?.prompt?.category?.title || freeFormCategory}
                    titleStyles="text-lg text-left max-h-[48px] overflow-hidden"
                  />
                </button>
                <div className="md:hidden">
                  <EntryRenderer entry={entry} className="px-5" />
                </div>
              </div>
              {index < entries.length - 1 && (
                <Separator className="mt-7 mb-4 h-1 opacity-30 md:hidden" />
              )}
            </div>
          );
        })}
      </div>
      <div className="md:col-span-8 px-5 md:px-16 hidden md:block">
        {currentEntry !== null && (
          <>
            <EntryHeader
              className="px-0"
              leading={
                entries[currentEntry]?.prompt?.category?.title ||
                freeFormCategory
              }
              title={
                entries[currentEntry]?.prompt?.prompt?.title || freeFormTitle
              }
              date={entries[currentEntry]?.createdAt}
            />
            <EntryRenderer entry={entries[currentEntry]} className="px-0" />
          </>
        )}
      </div>
    </div>
  );
}
