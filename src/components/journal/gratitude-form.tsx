"use client";

import { GratitudeEntryData } from "@/lib/types";
import { EntryRenderer } from "@/components/journal/entry-renderer";
import { formatDateAtHour } from "@/lib/utils";
import { format } from "date-fns";
import { journal } from "@/lib/routes";

type GratitudeFormProps = {
  date: string;
} & GratitudeEntryData;

function GratitudeForm({
  dailyGratitudeId,
  dailyGratitudeEntry,
  lifeGratitudeId,
  lifeGratitudeEntry,
  date,
}: GratitudeFormProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      <div>
        <p>What are you grateful for today?</p>
        <EntryRenderer
          newPromptId={dailyGratitudeId}
          entry={dailyGratitudeEntry}
          className="px-0 md:px-0"
          textareaStyles="min-h-[10rem] md:min-h-[14rem]"
          onDeleteLink={journal.href}
          onCreateRefresh
          createdAt={
            dailyGratitudeEntry
              ? // Use current time
                undefined
              : // Manually set to 12pm for previous date
                formatDateAtHour(date, 12)
          }
        />
      </div>
      <div>
        <p>What are you grateful for in your life?</p>
        <EntryRenderer
          newPromptId={lifeGratitudeId}
          entry={lifeGratitudeEntry}
          className="px-0 md:px-0"
          textareaStyles="min-h-[10rem] md:min-h-[14rem]"
          onDeleteLink={journal.href}
          onCreateRefresh
          createdAt={
            lifeGratitudeEntry
              ? // Use current time
                undefined
              : // Manually set to 12pm for previous date
                formatDateAtHour(date, 12)
          }
        />
      </div>
    </div>
  );
}

export { GratitudeForm };
