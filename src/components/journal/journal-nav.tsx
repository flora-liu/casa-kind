import {
  IconCardStack,
  IconHome,
  IconListBullet,
  IconPlus,
} from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

function JournalNav() {
  return (
    <div className="flex flex-row flex-wrap gap-6 md:gap-8 items-end justify-between md:justify-start">
      <div className="flex flex-row flex-wrap gap-6 md:gap-8">
        <Link
          variant="basic"
          href="/journal"
          className="flex items-center h-7 md:h-8"
        >
          <IconHome className="mr-1" />
          Overview
        </Link>
        <Link
          variant="basic"
          href="/journal/prompts"
          className="flex items-center h-7 md:h-8"
        >
          <IconCardStack className="mr-1" />
          Prompts
        </Link>
        <Link
          variant="basic"
          href="/journal/entries"
          className="flex items-center h-7 md:h-8"
        >
          <IconListBullet className="mr-1" />
          Entries
        </Link>
      </div>
      <Button size="sm" asChild className="p-2 h-7 md:h-8 md:p-3">
        <a href="/journal/entry/new" className="flex items-center">
          <IconPlus className="md:mr-1" />
          <span className="hidden md:block">New entry</span>
        </a>
      </Button>
    </div>
  );
}

export { JournalNav };
