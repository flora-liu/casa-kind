import { getAllPromptsByCategory } from "@/app/actions";
import { IconArrowRight, IconPencil } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
import { JournalNav } from "@/components/journal/journal-nav";
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
    <Layout
      title="Journal"
      subtitle="Cultivate awareness through observing what's on your mind"
      headerNav={<JournalNav />}
    >
      <Section title="Prompt of the day">
        <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6 border border-border min-h-[14rem] flex flex-col justify-between gap-y-2.5 md:gap-y-3">
          <p className="text-sm text-muted-foreground">Growth</p>
          <h2 className="text-xl md:text-3xl font-relative tracking-tight">
            Where in your life or your work are you currently pursuing comfort,
            when what’s called for is a little discomfort?
          </h2>
          <div>
            <Button variant="secondary" size="sm">
              <IconPencil className="mr-1.5 h-3 w-3" /> Answer
            </Button>
          </div>
        </div>
      </Section>
      {categories &&
        categories?.map((category, categoryIndex) => {
          const { prompts, title: categoryTitle, slug } = category;
          if (prompts?.length === 0) {
            return null;
          }
          return (
            <Section
              key={categoryIndex}
              className="py-2 md:py-3"
              title={categoryTitle}
              headerRight={
                <div className="flex items-center">
                  <Link
                    variant="basic"
                    className="flex items-center"
                    href={`/journal/category/${slug}`}
                  >
                    <p className="text-sm md:text-base">See more</p>
                    <IconArrowRight className="ml-0.5 mr:ml-1 h-3 w-3 md:h-4 md:w-4 md:mt-0.5" />
                  </Link>
                </div>
              }
            >
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
            </Section>
          );
        })}
    </Layout>
  );
}

export default Page;
