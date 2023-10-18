import { IconCross } from "@/components/common/icons";
import JournalForm from "@/components/journal/journal-form";
import { Link } from "@/components/ui/link";

export default function Page() {
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
      <div className="sm:max-w-2xl justify-start flex flex-col items-center mx-auto w-full">
        <JournalForm />
      </div>
    </div>
  );
}