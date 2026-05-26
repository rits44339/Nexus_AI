import { useEffect, useState, useCallback } from "react";
import type { UIMessage } from "ai";

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

const KEY = "nexus.threads.v1";

function read(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(threads: ChatThread[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(threads));
  } catch {
    /* quota */
  }
}

export function newThreadId() {
  return (
    "t_" +
    Math.random().toString(36).slice(2, 10) +
    Date.now().toString(36).slice(-4)
  );
}

export function createThread(): ChatThread {
  const t: ChatThread = {
    id: newThreadId(),
    title: "New conversation",
    updatedAt: Date.now(),
    messages: [],
  };
  const all = read();
  write([t, ...all]);
  return t;
}

export function deleteThread(id: string) {
  write(read().filter((t) => t.id !== id));
}

export function getThread(id: string): ChatThread | undefined {
  return read().find((t) => t.id === id);
}

export function saveThreadMessages(id: string, messages: UIMessage[]) {
  const all = read();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], messages, updatedAt: Date.now() };
  // derive title from first user message if still default
  if (all[idx].title === "New conversation") {
    const firstUser = messages.find((m) => m.role === "user");
    if (firstUser) {
      const text = firstUser.parts
        .map((p) => (p.type === "text" ? p.text : ""))
        .join(" ")
        .trim();
      if (text) all[idx].title = text.slice(0, 48);
    }
  }
  // sort by updated
  all.sort((a, b) => b.updatedAt - a.updatedAt);
  write(all);
  window.dispatchEvent(new CustomEvent("nexus-threads-changed"));
}

export function useThreads() {
  const [threads, setThreads] = useState<ChatThread[]>(() => read());

  useEffect(() => {
    const sync = () => setThreads(read());
    window.addEventListener("storage", sync);
    window.addEventListener("nexus-threads-changed", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("nexus-threads-changed", sync as EventListener);
    };
  }, []);

  const create = useCallback(() => {
    const t = createThread();
    setThreads(read());
    return t;
  }, []);

  const remove = useCallback((id: string) => {
    deleteThread(id);
    setThreads(read());
  }, []);

  return { threads, create, remove };
}
