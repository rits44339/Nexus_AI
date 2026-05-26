import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { createThread } from "@/lib/threads";
import { ChatSidebar } from "@/components/chat/ChatSidebar";

export const Route = createFileRoute("/chat/")({
  head: () => ({ meta: [{ title: "Chat — NEXUS AI" }] }),
  component: ChatIndex,
});

function ChatIndex() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = createThread();
    navigate({ to: "/chat/$threadId", params: { threadId: t.id }, replace: true });
  }, [navigate]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar />
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Starting a new conversation…
      </div>
    </div>
  );
}
