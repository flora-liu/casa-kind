import { getEntryById } from "@/app/actions";
import { IconCross } from "@/components/common/icons";
import { EntryRenderer } from "@/components/journal/entry-renderer";
import { Link } from "@/components/ui/link";

async function Page({ params: { id } }: { params: { id: string } }) {
  const entry = await getEntryById(id);
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
        <EntryRenderer entry={entry} />
      </div>
    </div>
  );
}

export default Page;
