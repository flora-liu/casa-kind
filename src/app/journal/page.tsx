import { getAllPromptsByCategory } from "@/app/actions";
import {
  IconArrowRight,
  IconListBullet,
  IconPencil,
  IconPlus,
} from "@/components/common/icons";
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
    <div className="my-16 min-h-screen w-full flex flex-col justify-center items-center">
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl flex flex-col items-start justify-start w-full px-6 py-4 md:px-8 md:py-6">
        <div className="pt-4 md:pt-6 w-full flex justify-between flex-col md:flex-row gap-8">
          <div>
            <h1 className="mb-3 text-xl font-semibold">Journal</h1>
            <p className="leading-normal text-muted-foreground">
              Cultivate awareness through observing what&apos;s on your mind
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button className="md:order-2 order-1" asChild>
              <a href="/journal/entry/new" className="flex items-center">
                <IconPlus className="mr-1" />
                New entry
              </a>
            </Button>
            <Button className="md:order-1 order-2" variant="outline" asChild>
              <a href="/journal/entries" className="flex items-center">
                <IconListBullet className="mr-1" />
                View entries
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl w-full flex flex-col gap-y-4 md:gap-y-6">
        <div className="px-6 md:px-8 p-4 md:p-6 flex flex-col gap-y-4 md:gap-y-6">
          <h3 className="mb-3 text-base md:text-lg font-semibold">
            Prompt of the day
          </h3>
          <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6 border border-border min-h-[14rem] flex flex-col justify-between gap-y-2.5 md:gap-y-3">
            <p className="text-sm text-muted-foreground">Growth</p>
            <h2 className="text-xl md:text-3xl font-relative tracking-tight">
              Where in your life or your work are you currently pursuing
              comfort, when what’s called for is a little discomfort?
            </h2>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-white/80 text-muted-foreground text-sm"
              >
                <IconPencil className="mr-1.5 h-3 w-3" /> Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
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
                <div className="px-3 md:px-5 flex justify-between items-center">
                  <h3 className="mb-3 text-base md:text-lg font-semibold">
                    {categoryTitle}
                  </h3>
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
                          <IconPencil className="mr-1.5 h-3 w-3" /> Answer
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
