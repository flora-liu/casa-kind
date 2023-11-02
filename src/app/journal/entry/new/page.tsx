import { IconCross } from "@/components/common/icons";
import { Link } from "@/components/ui/link";
import { getPromptById, getDailyPrompt } from "@/app/actions";
import { PromptWithCategory } from "@/lib/types";
import { getSession } from "@/app/auth";
import { redirect } from "next/navigation";
import { NewEntry } from "@/components/journal/new-entry";
import { Button } from "@/components/ui/button";

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
    <div className="relative h-[calc(100vh-85px)]">
      {/* <div className="absolute justify-end flex flex-col items-center mx-auto right-0 py-4 md:py-2">
        <div className="w-full flex justify-end px-5 md:px-6">
          <Link
            href="/journal/entries"
            className="flex items-center text-sm md:text-base"
            variant="basic"
          >
            <IconCross className="h-5 w-5 rotate-45" />
          </Link>
        </div>
      </div> */}
      <div className="sm:max-w-2xl justify-start flex flex-col items-center mx-auto w-full pb-2">
        <NewEntry
          promptOfTheDay={promptOfTheDay}
          selectedPrompt={selectedPrompt}
          onCancelEditLink="/journal/entries"
        />
      </div>
    </div>
  );
}

export default Page;
