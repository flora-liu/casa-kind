import { IconPencil } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
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
import { BlurImage } from "@/components/ui/blur-image";
import { GratitudeViewer } from "@/components/journal/gratitude-viewer";
import { journal, journalNewEntry } from "@/lib/routes";

async function Page() {
  const dailyPrompt = await getDailyPrompt();
  const gratitudeData = await getDailyGratitudeEntries();
  const prompts = await getRandomPrompts();

  return (
    <Layout
      title={journal.title}
      subtitle="Cultivate awareness by noting your thoughts"
      headerNav={<JournalNav />}
    >
      <Section innerStyles="justify-center pb-10">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-start-1 md:col-span-5">
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
              Daily gratitude
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Simply notice the good things that are happening. What do you
              appreciate about them? How would you feel if it went away?
            </p>
          </div>
          <GratitudeViewer {...gratitudeData} />
        </div>
      </Section>
      {dailyPrompt && (
        <Section innerStyles="pt-0">
          <div className="bg-card text-card-foreground rounded-xl border border-border overflow-hidden">
            <div className="w-full flex flex-col md:grid md:grid-cols-12 md:gap-4">
              <div className="order-2 md:order-none md:col-span-7 h-full p-4 md:p-6 min-h-[14rem] flex flex-col justify-between gap-y-6">
                <p className="text-base md:text-lg mt-2 font-semibold">
                  Prompt of the day
                </p>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3">
                    {dailyPrompt?.category?.title}
                  </p>
                  <h2 className="text-xl md:text-3xl font-relative tracking-tight">
                    {dailyPrompt?.prompt?.title}
                  </h2>
                </div>
                <div>
                  <Button variant="secondary" size="sm" asChild>
                    <a href={journalNewEntry.href}>
                      <IconPencil className="mr-1.5 h-3 w-3" /> Answer
                    </a>
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-none md:col-start-8 md:col-span-5 md:h-[30rem]">
                <div className="relative w-full h-full overflow-hidden">
                  <BlurImage
                    alt="Sea shells"
                    src="/images/crina-parasca-f-HAwc4A36s-unsplash.jpg"
                    sizes="100vw"
                    className="absolute w-full h-full object-center md:object-bottom"
                    fill
                    aspectRatio="aspect-w-4 aspect-h-3 md:aspect-w-3 md:aspect-h-4 md:aspect-none md:object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
      <Section
        title="Create space to observe your thoughts"
        className="pb-4 md:pb-8"
      >
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
