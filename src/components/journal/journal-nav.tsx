import { IconHome, IconPlus } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  journal,
  journalPrompts,
  journalEntries,
  journalNewEntry,
} from "@/lib/routes";

const journalHome = {
  ...journal,
  title: "Overview",
  icon: <IconHome />,
};

const journalRoutes = [journalHome, journalPrompts, journalEntries];

function JournalNav() {
  return (
    <div className="flex flex-row flex-wrap gap-6 md:gap-8 items-end justify-between md:justify-start">
      <div className="flex flex-row flex-wrap gap-6 md:gap-8">
        {journalRoutes.map((item) => (
          <Link
            key={`journal-nav-${item.key}`}
            variant="basic"
            href={item.href}
            className="flex items-center h-7 md:h-8"
          >
            {item.icon}
            <span className="ml-1">{item.title}</span>
          </Link>
        ))}
      </div>
      <Button size="sm" asChild className="p-2 h-7 md:h-8 md:p-3">
        <Link
          variant="basic"
          href={journalNewEntry.href}
          className="flex items-center hover:text-primary-foreground"
        >
          <IconPlus className="md:mr-1" />
          <span className="hidden md:block">{journalNewEntry.title}</span>
        </Link>
      </Button>
    </div>
  );
}

export { JournalNav };
