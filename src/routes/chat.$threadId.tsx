import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getThread, createThread, type ChatThread } from "@/lib/threads";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";

export const Route = createFileRoute("/chat/$threadId")({
  head: () => ({ meta: [{ title: "Chat — NEXUS AI" }] }),
  component: ThreadPage,
});

function ThreadPage() {
  const { threadId } = Route.useParams();
  const [thread, setThread] = useState<ChatThread | null>(null);

  useEffect(() => {
    const existing = getThread(threadId);
    if (existing) {
      setThread(existing);
    } else {
      const t = createThread();
      setThread(t);
    }
  }, [threadId]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar />
      {thread ? (
        <ChatWindow key={thread.id} threadId={thread.id} initialMessages={thread.messages} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Loading…</div>
      )}
    </div>
  );
}
