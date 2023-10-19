import { IconCross } from "@/components/common/icons";
import { EntryForm } from "@/components/journal/entry-form";
import { Link } from "@/components/ui/link";
import { getPromptById, getPromptOfTheDay } from "@/app/actions";
import { PromptWithCategory } from "@/lib/types";
import { getSession } from "@/app/auth";
import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const promptOfTheDay = await getPromptOfTheDay();
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
            href="/journal"
            className="flex items-center text-sm md:text-base"
            variant="basic"
          >
            <IconCross className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="sm:max-w-2xl justify-start flex flex-col items-center mx-auto w-full pb-16 md:pb-20">
        <EntryForm
          promptOfTheDay={promptOfTheDay}
          selectedPrompt={selectedPrompt}
        />
      </div>
    </div>
  );
}

export default Page;
