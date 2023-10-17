import { getAllPromptsByCategory } from "@/app/actions";
import { IconArrowRight, IconPencil } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { capitalizeWords, cn } from "@/lib/utils";

const colors = [
  "bg-[#E2D6CA]",
  "bg-[#EBE9E1]",
  "bg-[#E3DECB]",
  "bg-[#EBE9E1]",
  "bg-[#E3DECB]",
  "bg-[#E2D6CA]",
];

const limit = 12;

async function Page() {
  const categories = await getAllPromptsByCategory();
  return (
    <div className="mt-16 md:mt-12 min-h-screen w-full flex justify-center items-center">
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl p-4 w-full flex flex-col gap-y-4 md:gap-y-6">
        {categories &&
          Object.keys(categories)?.map((key, categoryIndex) => {
            if (
              !categories[key] ||
              (categories[key] && categories[key]?.length === 0)
            ) {
              return null;
            }
            const categoryTitle = capitalizeWords(key);
            const prompts = categories[key];
            return (
              <div key={categoryIndex}>
                <div className="px-2 md:px-4 flex justify-between items-center">
                  <h3 className="mb-3 text-lg md:text-xl font-semibold">
                    {categoryTitle}
                  </h3>
                  <a href="/">
                    <div className="flex items-center">
                      <Link
                        variant="basic"
                        className="flex item-center"
                        href={`/journal/category/${key}`}
                      >
                        <p className="text-sm md:text-base">See more</p>
                        <IconArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </a>
                </div>
                <div className="p-2 md:p-4 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                  {prompts?.slice(0, 4)?.map(({ title }, promptIndex) => (
                    <div
                      key={promptIndex}
                      className={cn(
                        promptIndex === 3 ? "md:hidden" : "",
                        "gap-y-2.5 md:gap-y-3 h-52 md:min-h-60 md:h-96 bg-secondary rounded-lg p-3 sm:p-5 flex flex-col justify-between",
                        colors[categoryIndex % colors.length]
                      )}
                    >
                      <div className="flex justify-start">
                        <p className="text-sm text-muted-foreground">
                          {categoryTitle}
                        </p>
                      </div>
                      <p className="sm:text-lg md:text-3xl font-relative tracking-tight">
                        <span className="sm:hidden">
                          {title.split(" ").length <= limit
                            ? title
                            : `${title
                                .split(" ")
                                .slice(0, limit)
                                .join(" ")}...`}
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
            );
          })}
      </div>
    </div>
  );
}

export default Page;
