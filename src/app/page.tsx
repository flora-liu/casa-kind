"use client";

import { IconHeart, IconPencil } from "@/components/common/icons";
import { PromptCard } from "@/components/journal/prompt-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { colors } from "@/components/journal/prompt-card";
import { cn } from "@/lib/utils";
import { BlurImage } from "@/components/ui/blur-image";

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
      <div className="relative min-h-[30rem] md:min-h-[42rem] px-5 py-12 md:px-16 md:py-24 flex flex-col items-center justify-center">
        <div className="text-center grid grid-cols-12 md:max-w-7xl w-full z-30">
          <div className="col-span-12 mt-12">
            <h1 className="font-relative text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-3 md:mb-6">
              Cultivating a kinder world, <br />
              beginning at heart
            </h1>
            <p className="text-lg md:text-xl">
              Discover Casa Kind, your sanctuary for mindful self-care
            </p>
            <Button asChild size="lg" className="mt-8 md:mt-12">
              <a href="/home">Start now</a>
            </Button>
          </div>
        </div>
        <div className="absolute w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <BlurImage
              alt="Palm leaf"
              src="/images/tanya-trofymchuk-gzXhH-RiydU-unsplash.jpg"
              sizes="100vw"
              className="object-center"
              fill
            />
            <div className="absolute w-full h-full bg-orange-100 opacity-50 md:/opacity-40" />
          </div>
        </div>
      </div>
      <div className="flex min-h-[60vh] bg-secondary flex-col items-center justify-center px-5 py-12 md:p-16 lg:p-24">
        <div className="text-center md:max-w-xl pb-12 md:pb-24 mt-4">
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
      <div className="flex justify-center">
        <div className="relative flex min-h-[42rem] max-w-5xl flex-col items-center justify-center w-full lg:flex-row">
          <div className="order-2 lg:order-1 text-left my-6 md:my-16 pb-12 lg:py-24 px-5 md:pl-0 md:pr-16">
            <h2 className="mb-2 text-2xl font-relative tracking-tight md:text-3xl">
              Get to know your self
            </h2>
            <p className="text-lg mb-6 md:mb-8">
              Through connecting your mind and heart
            </p>
            <p className="max-w-xl text-muted-foreground">
              Engage in deeper, mindful observation of your thoughts to truly
              understand your current state. Recognizing these thought patterns
              is the first step to creating alignment in your life. We offer
              dedicated support to help apply your insights to your life so you
              can actually make impactful changes.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative h-[16rem] sm:h-[20rem] lg:h-[32rem] w-full my-4 overflow-hidden md:overflow-visible">
            <div className="absolute top-[15%] left-1/2 -translate-x-[150%] -rotate-[10deg]">
              <PromptCard
                categoryTitle={journalPrompts[3]?.category?.title}
                promptId={journalPrompts[3]?.prompt?.id}
                promptTitle={journalPrompts[3]?.prompt?.title}
                className={cn(
                  colors[2],
                  "w-[10rem] h-[12rem] sm:w-[12rem] sm:h-[15rem] md:min-h-none md:h-[18rem] md:w-[14rem] lg:h-[18rem]"
                )}
              />
            </div>
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2">
              <PromptCard
                categoryTitle={journalPrompts[4]?.category?.title}
                promptId={journalPrompts[4]?.prompt?.id}
                promptTitle={journalPrompts[4]?.prompt?.title}
                className={cn(
                  colors[1],
                  "w-[10rem] h-[12rem] sm:w-[12rem] sm:h-[15rem] md:min-h-none md:h-[18rem] md:w-[14rem] lg:h-[18rem]"
                )}
              />
            </div>
            <div className="absolute top-[15%] left-1/2 translate-x-[50%] rotate-[10deg]">
              <PromptCard
                categoryTitle={journalPrompts[2]?.category?.title}
                promptId={journalPrompts[2]?.prompt?.id}
                promptTitle={journalPrompts[2]?.prompt?.title}
                className={cn(
                  colors[5],
                  "w-[10rem] h-[12rem] sm:w-[12rem] sm:h-[15rem] md:min-h-none md:h-[18rem] md:w-[14rem] lg:h-[18rem]"
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:max-h-[34rem] w-full flex flex-col md:flex-row md:justify-between">
        <div className="order-2 px-5 flex flex-col items-center md:items-start justify-center py-20 md:p-16 lg:py-24 lg:px-32">
          <div className="text-left w-full flex items-start flex-col md:max-w-lg">
            <h3 className="mb-2 text-xl font-relative tracking-tight md:text-2xl lg:text-3xl">
              Casa <span className="italic font-cambon">Kind </span>
            </h3>
            <p className="text-base md:text-lg mb-6 md:mb-8">
              Where we care for your heart through conscious compassion
            </p>
            <p className="max-w-xl text-muted-foreground">
              As Sri Sri Ravi Shankar simply puts, &quot;The state of your life
              depends on the state of your mind. So be kind to yourself.&quot;
              When we nurture a practice of kindness through mindful observation
              and conscious choices, we possess the freedom to build a life that
              feels full and vibrant.
            </p>
          </div>
        </div>
        <div className="h-[20rem] md:h-auto w-full md:max-h-none overflow-hidden order-1 md:grow">
          <div className="w-full h-full relative">
            <BlurImage
              alt="Palm leaf"
              src="/images/annie-spratt-GMSqa8vdx84-unsplash.jpg"
              // https://stackoverflow.com/questions/65169431/how-to-set-the-next-image-component-to-100-height
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
