import { IconPencil } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
import { GratitudeForm } from "@/components/journal/gratitude-form";
import { JournalNav } from "@/components/journal/journal-nav";
import { Button } from "@/components/ui/button";
import {
  getDailyGratitudeEntries,
  getDailyPrompt,
  getRandomPrompts,
} from "@/app/actions";
import {
  PromptCard,
  PromptCardContainer,
} from "@/components/journal/prompt-card";
import { colors } from "@/components/journal/prompt-card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

async function Page() {
  const dailyPrompt = await getDailyPrompt();
  const gratitudeData = await getDailyGratitudeEntries();
  const prompts = await getRandomPrompts();

  return (
    <Layout
      title="Journal"
      subtitle="Cultivate awareness by noting your thoughts"
      headerNav={<JournalNav />}
    >
      {dailyPrompt && (
        <Section title="Prompt of the day" innerStyles="pt-2">
          <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6 border border-border min-h-[14rem] flex flex-col justify-between gap-y-2.5 md:gap-y-3">
            <p className="text-sm text-muted-foreground">
              {dailyPrompt?.category?.title}
            </p>
            <h2 className="text-xl md:text-3xl font-relative tracking-tight">
              {dailyPrompt?.prompt?.title}
            </h2>
            <div>
              <Button variant="secondary" size="sm" asChild>
                <a href="/journal/entry/new">
                  <IconPencil className="mr-1.5 h-3 w-3" /> Answer
                </a>
              </Button>
            </div>
          </div>
        </Section>
      )}
      <Section title="Daily gratitude">
        <GratitudeForm {...gratitudeData} />
      </Section>
      <Separator className="my-4 md:my-6" />
      <Section title="Create space to observe your thoughts">
        <p className="text-muted-foreground md:mb-3">
          Use these questions to check in with your self and connect within
        </p>
        <PromptCardContainer>
          {prompts?.map((item, promptIndex) => (
            <PromptCard
              categoryTitle={item?.category?.title}
              promptId={item?.prompt?.id}
              promptTitle={item?.prompt?.title}
              key={promptIndex}
              className={cn(colors[promptIndex % colors.length])}
            />
          ))}
        </PromptCardContainer>
      </Section>
    </Layout>
  );
}

export default Page;
