import { IconChevronRight } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
import {
  PromptCard,
  PromptCardContainer,
} from "@/components/journal/prompt-card";
import { Link } from "@/components/ui/link";
import { getRandomPrompts } from "@/app/actions";
import { colors } from "@/components/journal/prompt-card";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "Journal",
    description: "Create space to reflect",
    href: "/journal",
    duration: "5 - 10 mins",
  },
  {
    name: "Heart Talk",
    description: "Explore through conversation",
    href: "/heart-talk",
    duration: "5 mins",
  },
  {
    name: "Meditate",
    description: "Focus on the breath",
    href: "/meditate",
    duration: "5 / 10 / 15 mins",
  },
];

export default async function Page() {
  const prompts = await getRandomPrompts();
  return (
    <Layout
      title="Welcome"
      subtitle="Warm hugs from Casa Kind, we're thrilled you're here."
    >
      <Section className="relative flex h-full flex-col items-center justify-center mt-2 md:mt-6">
        <div className="md:max-w-7xl md:grid md:grid-cols-2 bg-card pt-2 pb-4 md:py-8 rounded-xl border border-border">
          <div className="flex-1 w-full relative h-full flex-col p-5 md:px-10 md:py-4 dark:border-r md:flex">
            <div className="font-relative relative z-20 flex items-center text-4xl md:text-6xl lg:text-7xl mb-3">
              <h1>Self-Care Menu</h1>
            </div>
            <div className="relative mt-2">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  Pick one to nourish your being
                </p>
              </div>
            </div>
          </div>
          <div className="lg:px-8 md:py-4 relative flex-auto w-full">
            <div className="relative w-full h-full flex flex-col gap-y-3 py-2 md:gap-y-4 px-5 md:py0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative mx-auto flex w-full flex-col justify-center space-y-4 z-20 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                >
                  <Link
                    className="flex flex-col space-y-2 text-left px-4 py-4 md:py-8 w-full"
                    href={feature.href}
                    variant="basic"
                  >
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg md:text-xl font-medium tracking-tight">
                        {feature.name}
                      </h2>
                      <IconChevronRight className="h-3 w-3" />
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between gap-x-3 items-center text-base">
                      <p className="text-muted-foreground shrink-0">
                        {feature.description}
                      </p>
                      <div className="h-px w-full flex-grow border-dotted border-b-2 border-b-muted-foreground/60"></div>
                      <p className="text-muted-foreground shrink-0">
                        {feature.duration}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section className="my-4" title="Create space to observe your thoughts">
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
