"use client";

import { Chat } from "@/components/chat/chat";
import { Layout } from "@/components/common/layout";
import { heartTalk } from "@/lib/routes";

export default function Page() {
  return (
    <Layout
      title={heartTalk.title}
      subtitle="Connect deeper with your heart through dialogue"
    >
      <Chat />
    </Layout>
  );
}
