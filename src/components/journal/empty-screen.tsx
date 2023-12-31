import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/common/icons";
import { journalNewEntry } from "@/lib/routes";

export function EmptyScreen() {
  return (
    <div className="py-2 md:py-6 pb-[200px] w-full relative mx-auto sm:max-w-2xl px-4">
      <div className="bg-muted rounded-lg p-6 md:p-8 border border-border flex flex-col w-full">
        <p className="mb-2 leading-normal">
          It looks like you don&apos;t have any entries yet.
        </p>
        <p className="mb-2 leading-normal">
          Writing down your thoughts and feelings is a soothing self-care
          ritual. We&apos;ve curated some journaling prompts to guide and
          inspire you.
        </p>
        <div className="mt-6 flex flex-col items-start space-y-2">
          <div className="flex items-center">
            <Button size="md" asChild>
              <a href={journalNewEntry.href}>
                <IconArrowRight className="mr-1" />
                Get started
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
