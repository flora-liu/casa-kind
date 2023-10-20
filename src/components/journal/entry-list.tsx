import { Entry } from "@/lib/types";
import { EntryCard } from "@/components/journal/entry-card";
import { Section } from "@/components/common/layout";

export interface EntryListProps {
  entries: Array<Entry>;
}

export function EntryList({ entries }: EntryListProps) {
  return (
    <Section>
      {entries &&
        entries?.map((entry, index) => {
          return (
            <div key={index}>
              <EntryCard entry={entry} />
            </div>
          );
        })}
    </Section>
  );
}
