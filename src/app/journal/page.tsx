import { IconPencil } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
import { GratitudeForm } from "@/components/journal/gratitude-form";
import { JournalNav } from "@/components/journal/journal-nav";
import { Button } from "@/components/ui/button";
import { getDailyGratitudeEntries } from "@/app/actions";

async function Page() {
  const gratitudeData = await getDailyGratitudeEntries();
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
      <Section title="Daily gratitude">
        <GratitudeForm {...gratitudeData} />
      </Section>
    </Layout>
  );
}

export default Page;
