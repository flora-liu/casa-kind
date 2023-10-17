import { getPromptsByCategoryTitle } from "@/app/actions";
import { IconArrowRight, IconPencil } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { capitalizeWords, cn } from "@/lib/utils";

const limit = 12;

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const prompts = await getPromptsByCategoryTitle(id);
  const categoryTitle = capitalizeWords(id);
  return (
    <div className="my-16 md:my-12 min-h-screen w-full flex flex-col justify-center items-center">
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl flex flex-col items-start justify-start w-full px-6 py-4 md:px-8 md:py-6">
        <Link
          href="/journal"
          className="flex items-center text-sm md:text-base mb-4 md:mb-6"
          variant="basic"
        >
          <IconArrowRight className="rotate-180 mr-1"></IconArrowRight>Back to
          all
        </Link>
        <div className="rounded-lg py-4 md:py-6 px-1.5 md:px-2 w-full">
          <h1 className="mb-3 text-xl font-semibold">{categoryTitle}</h1>
          <p className="leading-normal text-muted-foreground">
            Journal prompts to connect with your deepest self
          </p>
        </div>
      </div>
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl px-4 w-full flex flex-col gap-y-4 md:gap-y-6">
        <div className="px-2 md:px-4 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {prompts?.map(({ title }, promptIndex) => (
            <div
              key={promptIndex}
              className={cn(
                promptIndex === 3 ? "md:hidden" : "",
                "gap-y-2.5 md:gap-y-3 h-52 md:min-h-60 md:h-96 bg-secondary rounded-lg p-3 sm:p-5 flex flex-col justify-between"
              )}
            >
              <div className="flex justify-start">
                <p className="text-sm text-muted-foreground">{categoryTitle}</p>
              </div>
              <p className="sm:text-lg md:text-3xl font-relative tracking-tight">
                <span className="sm:hidden">
                  {title.split(" ").length <= limit
                    ? title
                    : `${title.split(" ").slice(0, limit).join(" ")}...`}
                </span>
                <span className="hidden sm:block">{title}</span>
              </p>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-white/80 text-muted-foreground text-sm"
                >
                  Answer <IconPencil className="ml-1.5 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
