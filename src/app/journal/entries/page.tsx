import { redirect } from "next/navigation";
import { getEntriesForUser } from "@/app/actions";
import { getSession } from "@/app/auth";
import { EntryList } from "@/components/journal/entry-list";
import { EmptyScreen } from "@/components/journal/empty-screen";

async function Page() {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const entries = await getEntriesForUser(session?.user?.id);
  return (
    <>
      {entries && entries?.length > 0 ? (
        <EntryList entries={entries} />
      ) : (
        <EmptyScreen />
      )}
    </>
  );
}

export default Page;
