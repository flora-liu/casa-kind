"use client";
import { useRouter } from "next/navigation";
import { GratitudeEntryData } from "@/lib/types";
import { EntryRenderer } from "@/components/journal/entry-renderer";

interface GratitudeFormProps extends GratitudeEntryData {}

function GratitudeForm({
  dailyGratitudeId,
  dailyGratitudeEntry,
  lifeGratitudeId,
  lifeGratitudeEntry,
}: GratitudeFormProps) {
  const router = useRouter();

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <div>
        <p>What are you grateful for today?</p>
        <EntryRenderer
          newPromptId={dailyGratitudeId}
          entry={dailyGratitudeEntry}
          className="px-0 md:px-0"
          textareaStyles="min-h-[25vh] md:min-h-[30vh]"
          hideCancelButton
          deleteLink="/journal"
        />
      </div>
      <div>
        <p>What are you grateful for in your life?</p>
        <EntryRenderer
          newPromptId={lifeGratitudeId}
          entry={lifeGratitudeEntry}
          className="px-0 md:px-0"
          textareaStyles="min-h-[25vh] md:min-h-[30vh]"
          hideCancelButton
          deleteLink="/journal"
        />
      </div>
    </div>
  );
}

export { GratitudeForm };
