import { IconPencil } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const mobileWordLimit = 15;

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
        "gap-y-2.5 md:gap-y-3 h-52 md:min-h-[18rem] md:h-96 bg-secondary rounded-lg p-3 sm:p-5 flex flex-col justify-between",
        className
      )}
      {...props}
    >
      <div className="flex justify-start">
        <p className="text-sm text-muted-foreground">{categoryTitle}</p>
      </div>
      <p className="sm:text-lg md:text-3xl font-relative tracking-tight">
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
          className="bg-white hover:bg-white/80 text-muted-foreground text-sm"
        >
          <a href={`/journal/entry/new?prompt_id=${promptId}`}>
            <IconPencil className="mr-1.5 h-3 w-3" /> Answer
          </a>
        </Button>
      </div>
    </div>
  );
}

function PromptCardContainer({ children }: React.ComponentProps<"div">) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
      {children}
    </div>
  );
}

export { PromptCardContainer, PromptCard };
