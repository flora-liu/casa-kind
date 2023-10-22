"use client";

import { Hearts } from "@/components/common/hearts";
import { IconHeart, IconPencil } from "@/components/common/icons";
import { Button } from "@/components/ui/button";

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
      <div className="flex min-h-[60vh] bg-secondary flex-col items-center justify-center px-5 py-12 md:p-16 lg:px-24">
        <div className="text-center md:max-w-xl pb-16 md:pb-24">
          <h2 className="mb-6 md:mb-8 text-2xl font-relative md:text-3xl lg:text-4xl">
            Dedicate daily moments to nurture your happiest, most{" "}
            <span className="font-cambon font-light italic">whole</span> self
          </h2>
          <p>
            We understand that what everyone has different needs. We provide
            tools for building your individual practice of lifelong mindfulness.
          </p>
        </div>
        <div className=" lg:w-full mb-20 md:mb-32 lg:max-w-5xl grid lg:mb-0 lg:grid-cols-3 text-left gap-y-4 sm:gap-x-4">
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
    </div>
  );
}
