"use client";

import { Chat } from "@/components/chat/chat";
import { Layout } from "@/components/common/layout";

export default function Page() {
  return (
    <Layout
      title="Heart Talk"
      subtitle="Connect deeper with your heart through dialogue"
    >
      <Chat />
    </Layout>
  );
}
