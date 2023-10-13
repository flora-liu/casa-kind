import { IconChevronRight } from "@/components/common/icons";
import { Link } from "@/components/ui/link";

const features = [
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
  {
    name: "Journal",
    description: "Create space to reflect",
    href: "/journal",
    duration: "5 - 10 mins",
  },
];

export default function Page() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 lg:px-0">
      <div className="flex-1 w-full relative h-full flex-col p-5 pt-10 pb-8 md:p-10 dark:border-r md:flex">
        <div className="font-relative relative z-20 flex items-center text-5xl md:text-7xl mb-3 mt-20">
          Self-Care Menu
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-muted-foreground">
              Pick one to nourish your being
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 relative md:h-screen flex-auto w-full">
        <div className="absolute inset-0 z-10" />
        <div className="relative w-full h-full flex flex-col gap-y-3 py-2 md:gap-y-4 md:py-12 px-5 md:p-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative mx-auto flex w-full flex-col justify-center space-y-4 z-20 rounded-xl bg-secondary text-secondary-foreground"
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
                <div className="flex flex-row flex-nowrap justify-between gap-x-3 items-center">
                  <p className="text-sm text-muted-foreground shrink-0">
                    {feature.description}
                  </p>
                  <div className="h-px w-full flex-grow border-dotted border-b-2 border-b-muted-foreground/60"></div>
                  <p className="text-sm text-muted-foreground shrink-0">
                    {feature.duration}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
