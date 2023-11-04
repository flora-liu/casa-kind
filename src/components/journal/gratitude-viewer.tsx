"use client";

import { WeekPicker } from "@/components/journal/week-picker";
import { getWeekDates } from "@/lib/journal";
import { GratitudeEntryData } from "@/lib/types";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { GratitudeForm } from "@/components/journal/gratitude-form";

function GratitudeViewer({
  data,
}: {
  data: Record<string, GratitudeEntryData> | null;
}) {
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

  if (!data) {
    return null;
  }
  const gratitudeData = data[selected];
  const daysWithData = Object.keys(weekDates).reduce(
    (group: Record<string, boolean>, key: string) => {
      const date = weekDates[key];
      group[key] = !!data[date];
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
        <GratitudeForm {...gratitudeData} />
      </div>
    </>
  );
}

export { GratitudeViewer };
