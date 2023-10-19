import { getAllPromptsByCategory } from "@/app/actions";
import {
  IconArrowRight,
  IconListBullet,
  IconPencil,
  IconPlus,
} from "@/components/common/icons";
import {
  PromptCard,
  PromptCardContainer,
} from "@/components/journal/prompt-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

const colors = [
  "bg-[#E2D6CA]",
  "bg-[#EBE9E1]",
  "bg-[#E3DECB]",
  "bg-[#EBE9E1]",
  "bg-[#E3DECB]",
  "bg-[#E2D6CA]",
];

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
          categories?.map((category, categoryIndex) => {
            const { prompts, title: categoryTitle, slug } = category;
            if (prompts?.length === 0) {
              return null;
            }
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
                      href={`/journal/category/${slug}`}
                    >
                      <p className="text-sm md:text-base">See more</p>
                      <IconArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
                <PromptCardContainer>
                  {prompts?.slice(0, 4)?.map(({ title, id }, promptIndex) => (
                    <PromptCard
                      categoryTitle={categoryTitle}
                      promptId={id}
                      promptTitle={title}
                      key={promptIndex}
                      className={cn(
                        promptIndex === 3 ? "md:hidden" : "",
                        colors[categoryIndex % colors.length]
                      )}
                    />
                  ))}
                </PromptCardContainer>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Page;
