"use client";

import { WeekPicker } from "@/components/journal/week-picker";
import { GratitudeEntryData } from "@/lib/types";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { GratitudeForm } from "@/components/journal/gratitude-form";
import { getWeekDates, formatDateAtHour } from "@/lib/utils";

interface GratitudeViewerProps {
  entries?: Record<string, GratitudeEntryData>;
  dailyGratitudePromptId?: string;
  lifeGratitudePromptId?: string;
}

function GratitudeViewer({
  entries,
  dailyGratitudePromptId,
  lifeGratitudePromptId,
}: GratitudeViewerProps) {
  const today = format(new Date(), "yyyy-MM-dd");
  const weekDates = getWeekDates(today);
  const [selected, setSelected] = useState(today);
  const getDayOfWeek = useCallback(
    (searchValue: string) => {
      return Object.keys(weekDates).find(
        (key) => weekDates[key] === searchValue
      );
    },
    [weekDates]
  );

  const gratitudeData =
    entries && entries[selected]
      ? entries[selected]
      : {
          dailyGratitudeId: dailyGratitudePromptId,
          lifeGratitudeId: lifeGratitudePromptId,
        };
  const daysWithData = Object.keys(weekDates).reduce(
    (group: Record<string, boolean>, key: string) => {
      const date = weekDates[key];
      group[key] = entries ? !!entries[date] : false;
      return group;
    },
    {}
  );
  return (
    <>
      <div className="md:col-start-9 md:col-span-4 md:place-self-end">
        <div className="flex items-center gap-4 flex-wrap justify-between">
          <p className="font-medium xs:mt-[18px]">This week</p>
          <WeekPicker
            selected={getDayOfWeek(selected)}
            onClick={(dayOfWeek: string) => {
              setSelected(weekDates[dayOfWeek]);
            }}
            days={daysWithData}
            className="justify-between sm:justify-start md:justify-center"
          />
        </div>
      </div>
      <div className="md:col-start-1 md:col-span-12">
        <GratitudeForm date={selected} {...gratitudeData} />
      </div>
    </>
  );
}

export { GratitudeViewer };
