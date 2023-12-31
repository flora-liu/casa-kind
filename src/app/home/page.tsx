import { IconChevronRight } from "@/components/common/icons";
import { Layout, Section } from "@/components/common/layout";
import { Link } from "@/components/ui/link";
import { BlurImage } from "@/components/ui/blur-image";
import { Separator } from "@/components/ui/separator";

const selfCareFeatures = [
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

const selfDiscoveryFeatures = [
  {
    name: "My Core",
    description: "Dive deep into values, motivations, passions",
    href: "/my-core",
  },
  {
    name: "Heart Work",
    description: "Actionable guide to craft a life you adore",
    href: "/heart-work",
  },
];

export default async function Page() {
  return (
    <>
      <div className="relative min-h-[30rem] md:min-h-[42rem] px-5 py-12 md:px-16 md:py-24 flex flex-col items-center justify-center">
        <div className="text-center grid grid-cols-12 md:max-w-7xl w-full z-30">
          <div className="col-span-12 mt-12">
            <h1 className="font-relative text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-3 md:mb-6 dark:text-primary-foreground">
              Wherever you are, <br /> take a moment to{" "}
              <span className="font-cambon italic">ground</span>
            </h1>
            <p className="text-lg md:text-xl dark:text-primary-foreground">
              Anchor yourself in this moment
            </p>
          </div>
        </div>
        <div className="absolute w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <BlurImage
              alt="Window silhouette"
              src="/images/steinar-engeland-BfMbxUu0EGE-unsplash.jpg"
              sizes="100vw"
              className="absolute w-full h-full object-center z-10"
              fill
              aspectRatio="aspect-w-3 aspect-h-4 md:aspect-h-3 md:aspect-w-4"
            />
            <div className="z-20 inset-0 absolute w-full h-full bg-orange-100 opacity-50 md:opacity-40" />
          </div>
        </div>
      </div>
      <Layout className="min-h-0 pb-12">
        <Section
          innerStyles="w-full"
          className="relative flex h-full flex-col items-center justify-center"
        >
          <div className="md:max-w-7xl w-full md:grid md:grid-cols-2">
            <div className="flex-1 w-full relative md:h-full flex-col py-5 md:flex">
              <div className="font-relative relative z-20 flex items-center text-3xl md:text-5xl mb-3">
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
              <div className="relative w-full h-full flex flex-col gap-y-3 py-2 md:gap-y-4">
                {selfCareFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="relative mx-auto flex w-full flex-col justify-center space-y-4 z-20 rounded-xl bg-[#E3DECB] hover:bg-[#E3DECB]/80 text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground"
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
        {/* <Section
          innerStyles="py-2 w-full"
          className="relative flex h-full flex-col items-center justify-center"
        >
          <div className="md:max-w-7xl w-full md:grid md:grid-cols-2">
            <div className="flex-1 w-full relative h-full flex-col py-5 md:flex">
              <div className="font-relative relative z-20 flex items-center text-3xl md:text-5xl mb-3">
                <h1>Self-Discovery</h1>
              </div>
              <div className="relative mt-2">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">
                    Deepen your practice and cultivate a life you love
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:px-8 md:py-4 relative flex-auto w-full">
              <div className="relative w-full h-full flex flex-col gap-y-3 py-2 md:gap-y-4">
                {selfDiscoveryFeatures.map((feature, index) => (
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
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section> */}
        <Section outerStyles="bg-secondary">
          <div className="w-full flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 py-4">
            <div className="md:col-span-4 h-[26rem] md:h-[30rem]">
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <BlurImage
                  containerStyles="dark:bg-background"
                  alt="Bed sheets"
                  src="/images/yaoqi-Bs_OAcsozAo-unsplash.jpg"
                  sizes="100vw"
                  className="absolute w-full h-full object-center rounded-lg"
                  fill
                  aspectRatio="aspect-w-3 aspect-h-4"
                />
              </div>
            </div>
            <div className="md:col-start-6 md:col-span-6 h-full flex flex-col justify-center py-2">
              <p className="text-muted-foreground mb-6 md:mb-8">Tiny thought</p>
              <div className="text-left flex flex-col justify-center">
                <p className="font-relative text-2xl md:text-3xl mb-4">
                  You are the universe, expressing itself as a human for a
                  little while.
                </p>
                <p>- Eckhart Tolle</p>
              </div>
            </div>
          </div>
        </Section>
      </Layout>
    </>
  );
}
