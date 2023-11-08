import { getCategoryBySlug } from "@/app/actions";
import { IconArrowRight } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
import { JournalNav } from "@/components/journal/journal-nav";
import {
  PromptCard,
  PromptCardContainer,
  colors,
} from "@/components/journal/prompt-card";
import { Link } from "@/components/ui/link";
import { journalPrompts } from "@/lib/routes";
import { cn } from "@/lib/utils";

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = await getCategoryBySlug(id);
  const categoryTitle = category?.title || "";
  const prompts = category?.prompts;
  return (
    <Layout
      title={`${categoryTitle} Prompts`}
      subtitle="Journal prompts to connect with your deepest self"
      headerNav={<JournalNav />}
    >
      <Section>
        <PromptCardContainer>
          {prompts?.map(({ title, id }, promptIndex) => (
            <PromptCard
              categoryTitle={categoryTitle}
              promptTitle={title}
              promptId={id}
              key={promptIndex}
              className={cn(colors[promptIndex % colors.length])}
            />
          ))}
        </PromptCardContainer>
      </Section>
      <Section className="flex justify-start">
        <Link
          href={journalPrompts.href}
          className="flex items-center text-sm md:text-base"
          variant="basic"
        >
          <IconArrowRight className="rotate-180 mr-0.5 mr:mr-1 h-3 w-3 md:h-4 md:w-4"></IconArrowRight>
          Back to all prompts
        </Link>
      </Section>
    </Layout>
  );
}

export default Page;
