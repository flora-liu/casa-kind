"use client";

import { Hearts } from "@/components/common/hearts";
import { IconHeart, IconPencil } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  PromptCard,
  PromptCardContainer,
} from "@/components/journal/prompt-card";
import { colors } from "@/components/journal/prompt-card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <IconPencil />,
    leading: "Tap into crafted spaces for thought",
    title: "Journal",
    description:
      "Carve out an intentional space for your thoughts and what’s on your mind. Discover your deepest self with tailored prompts that inspire reflection.",
  },
  {
    icon: <IconHeart />,
    leading: "Discover through dialogue",
    title: "Heart Talk",
    description:
      "Engage, express, and explore your feelings with our approachable chat experience designed to help you build emotional awareness.",
  },
  {
    icon: <IconPencil />,
    leading: "Uncover the power of stillness",
    title: "Meditate",
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
      <Hearts />
      <div className="min-h-[20rem] md:min-h-[48rem] px-5 py-12 md:px-16 md:py-24 flex flex-col items-center justify-center">
        <div className="text-left sm:grid sm:grid-cols-12 md:max-w-7xl w-full z-30">
          <div className="sm:col-span-8 mt-16">
            <h1 className="font-relative text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-3 md:mb-6">
              Cultivating a kinder world, <br />
              beginning at heart
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Discover Casa Kind, your sanctuary for mindful self-care
            </p>
            <Button asChild size="lg" className="mt-8 md:mt-12">
              <a href="/home">Start now</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-h-[60vh] bg-secondary flex-col items-center justify-center px-5 py-12 md:p-16 lg:py-20 lg:px-24">
        <div className="text-center md:max-w-xl pb-12 md:pb-24">
          <h2 className="mb-4 md:mb-8 text-2xl font-relative md:text-3xl lg:text-4xl">
            Dedicate daily moments to nurture your happiest, most{" "}
            <span className="font-cambon font-light italic">whole</span> self
          </h2>
          <p>
            We understand that what everyone has different needs. We provide
            tools for building your individual practice of lifelong mindfulness.
          </p>
        </div>
        <div className="lg:w-full mb-4 md:mb-32 lg:max-w-5xl lg:mb-0 lg:grid-cols-3 text-left grid gap-y-4 sm:gap-x-4">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="px-2 py-4 flex flex-col gap-y-2 md:gap-y-3"
              >
                <div className="p-3 py-2.5 bg-accent/60 rounded-md w-fit mb-3">
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-12 md:p-16 lg:px-24 lg:py-24 w-full">
        <div className="text-left mb-12 md:mb-16 lg:mb-20 w-full">
          <h2 className="mb-2 md:mb-3 text-2xl font-relative tracking-tight md:text-3xl lg:text-4xl">
            Get to know your self
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-6 md:mb-8">
            Through connecting your mind and heart
          </p>
          <p className="max-w-xl">
            Engage in deeper, mindful observation of your thoughts to truly
            understand your current state. Recognizing these thought patterns is
            the first step to creating alignment in your life. We offer
            dedicated support and structure to guide your journey, like asking
            meaningful questions to help you develop insight. We are here to
            help you apply these insights to your life so you can actually make
            impactful changes.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="lg:w-full mb-12 md:mb-32 lg:max-w-5xl lg:mb-0 text-left gap-y-4 sm:gap-x-4">
            <PromptCardContainer>
              {journalPrompts?.map((item, promptIndex) => (
                <PromptCard
                  categoryTitle={item?.category?.title}
                  promptId={item?.prompt?.id}
                  promptTitle={item?.prompt?.title}
                  key={promptIndex}
                  className={cn(colors[promptIndex % colors.length])}
                />
              ))}
            </PromptCardContainer>
          </div>
        </div>
      </div>
      <div className="flex md:min-h-[30rem] flex-col items-center justify-center px-5 py-20 md:p-16 lg:px-24 lg:py-24 w-full bg-accent/70">
        <div className="text-center max-w-5xl w-full flex items-center flex-col">
          <h3 className="mb-2 md:mb-3 text-xl font-relative tracking-tight md:text-2xl lg:text-3xl">
            Casa <span className="italic font-cambon">Kind </span>
          </h3>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            Where we care for your heart through conscious compassion
          </p>
          <p className="text-center max-w-xl">
            As Sri Sri Ravi Shankar simply puts, "The state of your life depends
            on the state of your mind. So be kind to yourself." When we nurture
            a practice of kindness through mindful observation and conscious
            choices, we possess the freedom to build a life that feels full and
            vibrant.
          </p>
        </div>
      </div>
    </div>
  );
}
