"use client";

import { PromptCard } from "@/components/journal/prompt-card";
import { Button } from "@/components/ui/button";
import { colors } from "@/components/journal/prompt-card";
import { cn } from "@/lib/utils";
import { BlurImage } from "@/components/ui/blur-image";
import { appName, heartTalk, homeBase, journal, meditate } from "@/lib/routes";

const features = [
  {
    icon: journal.icon,
    leading: "Tap into crafted spaces for thought",
    title: journal.title,
    description:
      "Carve out an intentional space for your thoughts and what’s on your mind. Discover your deepest self with tailored prompts that inspire reflection.",
  },
  {
    icon: heartTalk.icon,
    leading: "Discover through dialogue",
    title: heartTalk.title,
    description:
      "Engage, express, and explore your feelings with our approachable chat experience designed to help you build emotional awareness.",
  },
  {
    icon: meditate.icon,
    leading: "Uncover the power of stillness",
    title: meditate.title,
    description:
      "Experience the transformative power of meditation for clarity and rejuvenation. Build a steady mindfulness practice that brings alignment to your everyday.",
  },
];

const journalPrompts = [
  {
    prompt: {
      id: "66ffaf2a-cb71-4d35-b6b0-12366d99bb71",
      title: "What are you grateful for in your life?",
    },
    category: {
      id: "b879443f-c75e-48ec-bd56-4a9672e7aae6",
      title: "Gratitude",
      slug: "gratitude",
    },
  },
  {
    prompt: {
      id: "bab5b11a-ae0f-4721-8527-a75ca3f6c8c5",
      title:
        "What themes, patterns, or symbols have I noticed in my life lately?",
    },
    category: {
      id: "30536a67-82b3-4f8e-b438-9119813a5aa9",
      title: "Daily",
      slug: "daily",
    },
  },
  {
    prompt: {
      id: "a498a5b8-f570-4e41-b5ec-04c7c2a41989",
      title:
        "What’s one thing that I feel scared to do, even though I know it’s important?",
    },
    category: {
      id: "efd5a892-9d03-461e-b45e-75ff5c9d0ed2",
      title: "Self-discovery",
      slug: "self-discovery",
    },
  },
  {
    prompt: {
      id: "02d479bf-ad16-489d-b79a-90e0305ba8d2",
      title: "What does a full life mean to me?",
    },
    category: {
      id: "ec3b52c7-d498-420e-996f-695748cb7860",
      title: "Self-discovery",
      slug: "self-discovery",
    },
  },
  {
    prompt: {
      id: "5f01048d-ae70-41b3-b74a-04c7270b08c4",
      title: "What hurts right now?",
    },
    category: {
      id: "d2e257d5-28f5-488f-8880-cf9f859742d7",
      title: "Relationship",
      slug: "relationship",
    },
  },
  {
    prompt: {
      id: "81fe9161-7ab7-441c-ab7d-439b0791577a",
      title: "What emotions am I holding on to?",
    },
    category: {
      id: "30536a67-82b3-4f8e-b438-9119813a5aa9",
      title: "Self-discovery",
      slug: "self-discovery",
    },
  },
];

export default function Page() {
  return (
    <div className="relative">
      <div className="relative min-h-[30rem] md:min-h-[42rem] px-5 py-12 md:px-16 md:py-24 flex flex-col items-center justify-center">
        <div className="text-center grid grid-cols-12 md:max-w-7xl w-full z-30">
          <div className="col-span-12 mt-12">
            <h1 className="font-relative text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-3 md:mb-6 dark:text-primary-foreground">
              Cultivating a kinder world, <br />
              beginning at heart
            </h1>
            <p className="text-lg md:text-xl dark:text-primary-foreground">
              Discover {appName}, your sanctuary for mindful self-care
            </p>
            <Button asChild size="lg" className="mt-8 md:mt-12">
              <a href={homeBase.href}>Start now</a>
            </Button>
          </div>
        </div>
        <div className="absolute w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <BlurImage
              alt="Palm leaf"
              src="/images/tanya-trofymchuk-gzXhH-RiydU-unsplash.jpg"
              sizes="100vw"
              className="absolute w-full h-full object-center z-10"
              fill
              aspectRatio="aspect-w-3 aspect-h-4 md:aspect-h-3 md:aspect-w-4"
            />
            <div className="z-20 inset-0 absolute w-full h-full bg-orange-100 opacity-50 md:opacity-40" />
          </div>
        </div>
      </div>
      <div className="bg-secondary">
        <div className="flex min-h-[60vh] justify-center max-w-7xl mx-auto md:py-8 md:px-5">
          <div className="flex flex-col items-center justify-center px-5 py-12">
            <div className="text-center md:max-w-xl pb-12 md:pb-24 mt-4">
              <h2 className="mb-4 md:mb-8 text-2xl font-relative md:text-3xl lg:text-4xl">
                Dedicate daily moments to nurture your happiest, most{" "}
                <span className="font-cambon font-light italic">whole</span>{" "}
                self
              </h2>
              <p>
                We understand that what everyone has different needs. We provide
                tools for building your individual practice of lifelong
                mindfulness.
              </p>
            </div>
            <div className="lg:w-full mb-4 md:mb-32 lg:max-w-7xl lg:mb-0 lg:grid-cols-3 text-left grid gap-y-4 sm:gap-x-4">
              {features.map((feature, index) => {
                return (
                  <div
                    key={index}
                    className="px-2 py-4 flex flex-col gap-y-2 md:gap-y-3"
                  >
                    <div className="p-3 py-2.5 bg-accent/60 rounded-md w-fit mb-3 dark:bg-primary/30">
                      {feature.icon}
                    </div>
                    <p className="max-w-[30ch] text-sm md:text-base text-muted-foreground">
                      {feature.leading}
                    </p>
                    <h2 className="mb-2 text-lg md:text-xl font-medium tracking-tight">
                      {feature.title}
                    </h2>
                    <p>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center max-w-7xl mx-auto md:py-8 sm:overflow-hidden lg:overflow-visible md:px-5">
        <div className="w-full grid lg:grid-cols-12 gap-4 md:gap-8">
          <div className="lg:col-span-4 order-2 lg:order-1 text-left pt-4 sm:pt-8 pb-12 px-5 flex justify-center md:justify-start items-center">
            <div className="lg:max-w-sm w-full">
              <h2 className="mb-2 text-2xl font-relative tracking-tight md:text-3xl">
                Get to know your self
              </h2>
              <p className="text-lg mb-6 md:mb-8">
                Through connecting your mind and heart
              </p>
              <p className="text-muted-foreground">
                Engage in deeper, mindful observation of your thoughts to
                understand your current state. Recognizing these thought
                patterns is the first step to creating alignment in your life.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 order-1 lg:order-2 relative overflow-hidden lg:overflow-visible">
            <div className="h-[16rem] sm:h-[20rem] md:h-[24rem] w-full my-4">
              <div className="absolute top-[20%] sm:top-[13%] left-1/2 -translate-x-[140%] -rotate-[15deg]">
                <PromptCard
                  categoryTitle={journalPrompts[4]?.category?.title}
                  promptId={journalPrompts[4]?.prompt?.id}
                  promptTitle={journalPrompts[4]?.prompt?.title}
                  className={cn(
                    colors[2],
                    "w-[10rem] h-[12rem] sm:w-[12rem] sm:h-[15rem] md:min-h-none md:h-[18rem] md:w-[14rem] lg:h-[18rem]",
                    "dark:bg-secondary dark:text-secondary-foreground"
                  )}
                />
              </div>
              <div className="absolute top-[12%] sm:top-[5%] left-1/2 -translate-x-1/2">
                <PromptCard
                  categoryTitle={journalPrompts[3]?.category?.title}
                  promptId={journalPrompts[3]?.prompt?.id}
                  promptTitle={journalPrompts[3]?.prompt?.title}
                  className={cn(
                    colors[1],
                    "w-[10rem] h-[12rem] sm:w-[12rem] sm:h-[15rem] md:min-h-none md:h-[18rem] md:w-[14rem] lg:h-[18rem]",
                    "dark:bg-secondary dark:text-secondary-foreground"
                  )}
                />
              </div>
              <div className="absolute top-[20%] sm:top-[12%] left-[47%] translate-x-[50%] rotate-[14deg]">
                <PromptCard
                  categoryTitle={journalPrompts[2]?.category?.title}
                  promptId={journalPrompts[2]?.prompt?.id}
                  promptTitle={journalPrompts[2]?.prompt?.title}
                  className={cn(
                    colors[5],
                    "w-[10rem] h-[12rem] sm:w-[12rem] sm:h-[15rem] md:min-h-none md:h-[18rem] md:w-[14rem] lg:h-[18rem]",
                    "dark:bg-secondary dark:text-secondary-foreground"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:max-h-[34rem] max-w-7xl mx-auto md:py-8 md:px-5">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <div className="order-2 px-5 flex flex-col items-center justify-center p-8">
            <div className="text-left w-full flex items-start flex-col md:max-w-sm">
              <h3 className="mb-2 text-xl font-relative tracking-tight md:text-2xl lg:text-3xl">
                Casa Kind
              </h3>
              <p className="text-lg mb-6 md:mb-8">
                Where we care for your heart through conscious compassion
              </p>
              <p className="max-w-xl text-muted-foreground">
                As Sri Sri Ravi Shankar simply puts, &quot;The state of your
                life depends on the state of your mind. So be kind to
                yourself.&quot; When we nurture a practice of kindness through
                mindful observation and conscious choices, we possess the
                freedom to build a life that feels full and vibrant.
              </p>
            </div>
          </div>
          <div className="h-[20rem] md:h-[24rem] w-full md:max-h-none overflow-hidden order-1 md:grow md:px-5">
            <div className="w-full h-full relative md:rounded-lg overflow-hidden">
              <BlurImage
                alt="Palm leaf"
                src="/images/annie-spratt-GMSqa8vdx84-unsplash.jpg"
                // https://stackoverflow.com/questions/65169431/how-to-set-the-next-image-component-to-100-height
                sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                fill
                className="md:rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
