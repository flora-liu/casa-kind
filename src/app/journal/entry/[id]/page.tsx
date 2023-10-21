import { getEntryById } from "@/app/actions";
import { IconCross } from "@/components/common/icons";
import { EntryRenderer } from "@/components/journal/entry-renderer";
import { Link } from "@/components/ui/link";
import { redirect } from "next/navigation";
import { EntryHeader } from "@/components/journal/entry-header";
import { freeFormCategory, freeFormTitle } from "@/lib/journal";

async function Page({ params: { id } }: { params: { id: string } }) {
  const entry = await getEntryById(id);
  if (!entry) {
    redirect("/journal");
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
            <IconCross className="h-5 w-5 rotate-45" />
          </Link>
        </div>
      </div>
      <div className="sm:max-w-2xl justify-start flex flex-col items-center mx-auto w-full pb-16 md:pb-20">
        <EntryHeader
          className="mt-2"
          leading={entry?.prompt?.category?.title || freeFormCategory}
          title={entry?.prompt?.prompt?.title || freeFormTitle}
          date={entry?.createdAt}
        />
        <EntryRenderer entry={entry} />
      </div>
    </div>
  );
}

export default Page;
