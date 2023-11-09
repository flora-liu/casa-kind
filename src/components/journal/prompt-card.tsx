import { IconPencil } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { journalNewEntry } from "@/lib/routes";

const mobileWordLimit = 15;

export const colors = [
  "bg-[#E2D6CA]",
  "bg-[#EBE9E1]",
  "bg-[#E3DECB]",
  "bg-[#EBE9E1]",
  "bg-[#E3DECB]",
  "bg-[#E2D6CA]",
];

type PromptCardProps = {
  categoryTitle: string;
  promptTitle: string;
  promptId: string;
} & React.ComponentProps<"div">;

function PromptCard({
  className,
  categoryTitle,
  promptTitle,
  promptId,
  ...props
}: PromptCardProps) {
  return (
    <div
      className={cn(
        "gap-y-2.5 md:gap-y-3 h-56 md:min-h-[20rem] bg-secondary rounded-lg p-3 sm:p-5 flex flex-col justify-between",
        "dark:bg-secondary dark:text-secondary-foreground",
        className
      )}
      {...props}
    >
      <div className="flex justify-start">
        <p className="text-sm text-muted-foreground">{categoryTitle}</p>
      </div>
      <p className="sm:text-lg md:text-xl lg:text-2xl font-relative tracking-tight">
        <span className="sm:hidden">
          {promptTitle.split(" ").length <= mobileWordLimit
            ? promptTitle
            : `${promptTitle
                .split(" ")
                .slice(0, mobileWordLimit)
                .join(" ")}...`}
        </span>
        <span className="hidden sm:block">{promptTitle}</span>
      </p>
      <div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="bg-white hover:bg-white/80 text-muted-foreground text-sm dark:text-primary-foreground"
        >
          <a href={`${journalNewEntry.href}?prompt_id=${promptId}`}>
            <IconPencil className="mr-1.5 h-3 w-3" /> Answer
          </a>
        </Button>
      </div>
    </div>
  );
}

function PromptCardContainer({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export { PromptCardContainer, PromptCard };
