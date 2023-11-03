"use client";

import { GratitudeEntryData } from "@/lib/types";
import { EntryRenderer } from "@/components/journal/entry-renderer";

function GratitudeForm({
  dailyGratitudeId,
  dailyGratitudeEntry,
  lifeGratitudeId,
  lifeGratitudeEntry,
}: GratitudeEntryData) {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      <div>
        <p className="mb-1">What are you grateful for today?</p>
        <EntryRenderer
          newPromptId={dailyGratitudeId}
          entry={dailyGratitudeEntry}
          className="px-0 md:px-0"
          textareaStyles="min-h-[10rem] md:min-h-[14rem]"
          onDeleteLink="/journal"
          onCreateRefresh
        />
      </div>
      <div>
        <p className="mb-1">What are you grateful for in your life?</p>
        <EntryRenderer
          newPromptId={lifeGratitudeId}
          entry={lifeGratitudeEntry}
          className="px-0 md:px-0"
          textareaStyles="min-h-[10rem] md:min-h-[14rem]"
          onDeleteLink="/journal"
          onCreateRefresh
        />
      </div>
    </div>
  );
}

export { GratitudeForm };
