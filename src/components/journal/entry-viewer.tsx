"use client";

import { cn } from "@/lib/utils";
import {
  freeFormCategory,
  freeFormTitle,
  isEntry,
  parseEntry,
} from "@/lib/journal";
import { EntryHeader } from "@/components/journal/entry-header";
import { Entry } from "@/lib/types";
import { useCallback, useEffect, useState, Suspense } from "react";
import { EntryRenderer } from "@/components/journal/entry-renderer";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { format, isBefore } from "date-fns";
import useQueryParams from "@/lib/hooks/use-query-params";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuthContext } from "@/components/common/auth-provider";
import { SkeletonLoader } from "@/components/ui/skeleton";

function parseDate(input: string) {
  const [year, month, day] = input.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JS
}

export function EntryViewer({
  entries: entriesProp,
}: {
  entries: Array<Entry>;
}) {
  const { queryParams, setQueryParams } = useQueryParams<{
    "start-date"?: string;
    "end-date"?: string;
  }>();
  const startDateFilter = queryParams?.get("start-date");
  const endDateFilter = queryParams?.get("end-date");
  const [error, setError] = useState<string | undefined>();
  const [entries, setEntries] = useState<Array<Entry>>(entriesProp || []);
  const [currentEntry, setCurrentEntry] = useState<number | null>(
    entries?.length > 0 ? 0 : null
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDateFilter ? parseDate(startDateFilter) : undefined,
    to: endDateFilter ? parseDate(endDateFilter) : undefined,
  });
  const supabase = createClientComponentClient();
  const { userId } = useAuthContext();

  const fetchEntries = useCallback(
    async function () {
      let query = supabase
        .from("entry")
        .select(
          `
          *,
          prompt (
            *,
            _category_to_prompt (
              category (id, title, slug)
            )
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (date?.from) {
        query.gte("created_at", format(date?.from, "yyyy-MM-dd"));
      }
      if (date?.to) {
        query.lte("created_at", format(date?.to, "yyyy-MM-dd"));
      }
      const { data, status, error } = await query;

      if (error && status !== 406) {
        console.error(`Error fetching entries with filter: ${error}`);
      }

      let result: Array<Entry> | null = null;
      if (data) {
        result = data?.map((item) => parseEntry(item))?.filter(isEntry);
        setEntries(result);
      }
    },
    [date]
  );

  useEffect(() => {
    // Handle possible error where start date is after end date
    if (date?.from && date?.to) {
      if (isBefore(date?.to, date?.from)) {
        setError("Start date must be before end date.");
      } else {
        setError(undefined);
      }
    }
  }, [date?.from, date?.to]);

  useEffect(() => {
    // Set query params on date change
    if (date?.from || date?.to) {
      setQueryParams({
        "start-date": date?.from ? format(date?.from, "yyyy-MM-dd") : undefined,
        "end-date": date?.to ? format(date?.to, "yyyy-MM-dd") : undefined,
      });
    }
  }, [date]);

  useEffect(() => {
    // Fetch entries with filter on load
    const fetchOnLoad = async () => {
      await fetchEntries();
    };
    if (startDateFilter || endDateFilter) {
      fetchOnLoad();
    }
  }, []);

  useEffect(() => {
    // Determine which entry to display
    setCurrentEntry(entries?.length > 0 ? 0 : null);
  }, [entries]);

  return (
    <div className="w-full md:grid-cols-12 md:grid sm:max-w-3xl md:max-w-6xl mt-3">
      <div className="md:col-span-4 md:px-5">
        <div className="mb-6 md:mb-4 md:py-2 rounded-xl">
          <div className="px-5 md:px-0">
            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
              <div className="max-w-[300px]">
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
              <div>
                <Button
                  disabled={error !== undefined}
                  variant="secondary"
                  className="w-[100px]"
                  onClick={async () => await fetchEntries()}
                >
                  Set filter
                </Button>
              </div>
            </div>
            {error && (
              <div className="mt-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
          <Separator className="my-6 block md:hidden h-1 opacity-30" />
        </div>
        <Suspense fallback={<SkeletonLoader />}>
          {entries?.length > 0 && (
            <ul className="md:h-[68vh] md:overflow-y-scroll pr-2 flex flex-col gap-y-2 list-none">
              {entries.map((entry, index) => {
                return (
                  <li
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
                        className="hidden md:block px-5 pb-1 md:p-4 w-full"
                        onClick={() => setCurrentEntry(index)}
                      >
                        <EntryHeader
                          className="px-0 md:py-0"
                          date={entry?.createdAt}
                          title={entry?.prompt?.prompt?.title || freeFormTitle}
                          leading={
                            entry?.prompt?.category?.title || freeFormCategory
                          }
                          titleStyles="text-lg text-left max-h-[48px] overflow-hidden"
                        />
                      </button>
                      <div className="md:hidden">
                        <EntryHeader
                          className="px-5 md:py-0"
                          date={entry?.createdAt}
                          title={entry?.prompt?.prompt?.title || freeFormTitle}
                          leading={
                            entry?.prompt?.category?.title || freeFormCategory
                          }
                          titleStyles="text-lg text-left max-h-[48px] overflow-hidden"
                        />
                        <EntryRenderer
                          entry={entry}
                          onUpdate={(updatedEntry: Entry) => {
                            const updatedEntries = entries;
                            updatedEntries[index] = updatedEntry;
                            setEntries(updatedEntries);
                          }}
                          onDelete={() => {
                            const updatedEntries = [...entries];
                            updatedEntries.splice(index, 1);
                            setEntries(updatedEntries);
                          }}
                          className="px-5"
                        />
                      </div>
                    </div>
                    {index < entries.length - 1 && (
                      <Separator className="mt-7 mb-4 h-1 opacity-30 md:hidden" />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </Suspense>
        {entries?.length === 0 && (
          <div className="px-5 py-2 md:px-1 text-center md:text-left">
            No entries found.
          </div>
        )}
      </div>
      <div className="md:col-span-8 px-5 md:px-16 md:pb-16 hidden md:block">
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
            <EntryRenderer
              entry={entries[currentEntry]}
              onUpdate={(updatedEntry: Entry) => {
                const updatedEntries = entries;
                updatedEntries[currentEntry] = updatedEntry;
                setEntries(updatedEntries);
              }}
              onDelete={() => {
                const updatedEntries = [...entries];
                updatedEntries.splice(currentEntry, 1);
                setEntries(updatedEntries);
              }}
              className="px-0"
            />
          </>
        )}
      </div>
    </div>
  );
}
