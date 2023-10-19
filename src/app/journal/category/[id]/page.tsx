import { getCategoryBySlug } from "@/app/actions";
import { IconArrowRight } from "@/components/common/icons";
import {
  PromptCard,
  PromptCardContainer,
} from "@/components/journal/prompt-card";
import { Link } from "@/components/ui/link";

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = await getCategoryBySlug(id);
  const categoryTitle = category?.title || "";
  const prompts = category?.prompts;
  return (
    <div className="my-16 min-h-screen w-full flex flex-col justify-center items-center">
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl flex flex-col items-start justify-start w-full px-6 py-4 md:px-8 md:py-6">
        <div className="mb-4 md:mb-6">
          <Link
            href="/journal"
            className="flex items-center text-sm md:text-base"
            variant="basic"
          >
            <IconArrowRight className="rotate-180 mr-1"></IconArrowRight>Back to
            all
          </Link>
        </div>
        <div className="rounded-lg py-4 md:py-6 px-1.5 md:px-2 w-full">
          <h1 className="mb-3 text-xl font-semibold">{categoryTitle}</h1>
          <p className="leading-normal text-muted-foreground">
            Journal prompts to connect with your deepest self
          </p>
        </div>
      </div>
      <div className="relative mx-auto sm:max-w-3xl md:max-w-5xl px-4 w-full flex flex-col gap-y-4 md:gap-y-6">
        <PromptCardContainer>
          {prompts?.map(({ title, id }, promptIndex) => (
            <PromptCard
              categoryTitle={categoryTitle}
              promptTitle={title}
              promptId={id}
              key={promptIndex}
              className={promptIndex === 3 ? "md:hidden" : ""}
            />
          ))}
        </PromptCardContainer>
      </div>
    </div>
  );
}

export default Page;
