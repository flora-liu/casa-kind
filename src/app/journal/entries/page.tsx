import { redirect } from "next/navigation";
import { getEntriesForUser } from "@/app/actions";
import { getSession } from "@/app/auth";
import { EmptyScreen } from "@/components/journal/empty-screen";
import { Layout } from "@/components/common/layout";
import { JournalNav } from "@/components/journal/journal-nav";
import { EntryViewer } from "@/components/journal/entry-viewer";

async function Page() {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const entries = await getEntriesForUser(session?.user?.id);

  return (
    <Layout title="Entries" headerNav={<JournalNav />} className="my-0 min-h-0">
      {entries && entries?.length > 0 ? (
        <EntryViewer entries={entries} />
      ) : (
        <EmptyScreen />
      )}
    </Layout>
  );
}

export default Page;
