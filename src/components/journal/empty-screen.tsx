import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/common/icons";

export function EmptyScreen() {
  return (
    <div className="pt-20 md:pt-10 pb-[200px] w-full relative mx-auto sm:max-w-2xl px-4">
      <div className="bg-muted rounded-lg p-6 md:p-8 border border-border flex flex-col w-full">
        <h1 className="mb-3 text-xl font-semibold">Journal</h1>
        <p className="mb-6 leading-normal text-muted-foreground">
          Create space to reflect
        </p>
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
              <a href="/journal/entry/new">
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
