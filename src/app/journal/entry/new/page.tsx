import { getPromptById, getDailyPrompt } from "@/app/actions";
import { PromptWithCategory } from "@/lib/types";
import { getSession } from "@/app/auth";
import { redirect } from "next/navigation";
import { NewEntry } from "@/components/journal/new-entry";
import { journalEntries } from "@/lib/routes";

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
      <div className="sm:max-w-2xl justify-start flex flex-col items-center mx-auto w-full pb-2 md:pt-6">
        <NewEntry
          promptOfTheDay={promptOfTheDay}
          selectedPrompt={selectedPrompt}
          onCancelEditLink={journalEntries.href}
        />
      </div>
    </div>
  );
}

export default Page;
