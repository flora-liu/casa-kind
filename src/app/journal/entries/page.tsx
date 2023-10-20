import { redirect } from "next/navigation";
import { getEntriesForUser } from "@/app/actions";
import { getSession } from "@/app/auth";
import { EntryList } from "@/components/journal/entry-list";
import { EmptyScreen } from "@/components/journal/empty-screen";
import { Layout } from "@/components/common/layout";
import { JournalNav } from "@/components/journal/journal-nav";

async function Page() {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const entries = await getEntriesForUser(session?.user?.id);
  return (
    <Layout title="Entries" headerNav={<JournalNav />}>
      {entries && entries?.length > 0 ? (
        <EntryList entries={entries} />
      ) : (
        <EmptyScreen />
      )}
    </Layout>
  );
}

export default Page;
