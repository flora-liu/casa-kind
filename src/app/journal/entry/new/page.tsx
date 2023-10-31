import { IconCross } from "@/components/common/icons";
import { Link } from "@/components/ui/link";
import { getPromptById, getDailyPrompt } from "@/app/actions";
import { PromptWithCategory } from "@/lib/types";
import { getSession } from "@/app/auth";
import { redirect } from "next/navigation";
import { NewEntry } from "@/components/journal/new-entry";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const promptOfTheDay = await getDailyPrompt();
  let selectedPrompt: PromptWithCategory | null = null;
  if (searchParams["prompt_id"]) {
    selectedPrompt = await getPromptById(`${searchParams["prompt_id"]}`);
  }
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      <div className="justify-start flex flex-col items-center mx-auto w-full">
        <div className="w-full flex justify-end my-7 md:my-10 px-5 md:px-6">
          <Link
            href="/journal/entries"
            className="flex items-center text-sm md:text-base"
            variant="basic"
          >
            <IconCross className="h-5 w-5 rotate-45" />
          </Link>
        </div>
      </div>
      <div className="sm:max-w-2xl justify-start flex flex-col items-center mx-auto w-full pb-16 md:pb-20">
        <NewEntry
          promptOfTheDay={promptOfTheDay}
          selectedPrompt={selectedPrompt}
        />
      </div>
    </div>
  );
}

export default Page;
