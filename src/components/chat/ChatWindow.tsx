import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputButton,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import ReactMarkdown from "react-markdown";
import { saveThreadMessages } from "@/lib/threads";
import { Paperclip, Mic, Sparkles, Globe, BarChart3, Code2, FileText, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import orbImg from "@/assets/nexus-orb.jpg";

const SUGGESTIONS = [
  { icon: Globe, label: "Research the AI agent market in 2026" },
  { icon: BarChart3, label: "Analyze last quarter's revenue trends" },
  { icon: Code2, label: "Generate a Stripe webhook handler in TypeScript" },
  { icon: FileText, label: "Summarize this PDF into 5 bullet points" },
];

const TOOLS = [
  { icon: Globe, label: "Web search" },
  { icon: Workflow, label: "Automation" },
  { icon: BarChart3, label: "Data analysis" },
  { icon: FileText, label: "Summarize" },
  { icon: Code2, label: "Code gen" },
  { icon: Sparkles, label: "Research" },
];

export function ChatWindow({
  threadId,
  initialMessages,
}: {
  threadId: string;
  initialMessages: UIMessage[];
}) {
  const [input, setInput] = useState("");
  const transportRef = useRef(new DefaultChatTransport({ api: "/api/chat" }));

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport: transportRef.current,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

  // persist
  useEffect(() => {
    if (status === "ready" || status === "error") {
      saveThreadMessages(threadId, messages);
    }
  }, [messages, status, threadId]);

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (_message: unknown, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = input.trim();
    if (!v || isLoading) return;
    sendMessage({ text: v });
    setInput("");
  };

  const sendSuggestion = (text: string) => {
    if (isLoading) return;
    sendMessage({ text });
  };

  const empty = messages.length === 0;

  return (
    <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-full bg-aurora opacity-70 blur-md" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20">
              <img src={orbImg} alt="" width={64} height={64} className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">NEXUS</div>
            <div className="text-[10px] text-muted-foreground">Aurora engine · Online</div>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {TOOLS.slice(0, 4).map((t) => (
            <button key={t.label} className="flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
              <t.icon className="h-3 w-3" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <Conversation className="relative h-full">
          <ConversationContent className="mx-auto w-full max-w-3xl px-4 pb-6 pt-8">
            {empty ? (
              <EmptyState onPick={sendSuggestion} />
            ) : (
              messages.map((m) => (
                <Message key={m.id} from={m.role}>
                  <MessageContent>
                    {m.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-code:text-neon-cyan prose-a:text-neon-cyan prose-strong:text-foreground">
                        {m.parts.map((p, i) =>
                          p.type === "text" ? (
                            <ReactMarkdown key={i}>{p.text}</ReactMarkdown>
                          ) : null,
                        )}
                      </div>
                    ) : (
                      m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null))
                    )}
                  </MessageContent>
                </Message>
              ))
            )}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <Message from="assistant">
                <MessageContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="relative h-2 w-2">
                      <div className="absolute inset-0 animate-ping rounded-full bg-neon-cyan" />
                      <div className="relative h-2 w-2 rounded-full bg-neon-cyan" />
                    </div>
                    <Shimmer>Thinking…</Shimmer>
                  </div>
                </MessageContent>
              </Message>
            )}
            {error && (
              <div className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground">
                {error.message || "Something went wrong. Try again."}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Input */}
      <div className="relative border-t border-white/5 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.04] shadow-glow-purple"
          >
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-aurora opacity-20 blur-md" />
            <div className="relative rounded-2xl bg-[oklch(0.12_0.03_270/0.85)] backdrop-blur-xl">
              <PromptInput onSubmit={onSubmit} className="rounded-2xl border-0 bg-transparent shadow-none">
                <PromptInputTextarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask NEXUS anything — research, code, analyze, automate…"
                  disabled={isLoading}
                />
                <PromptInputFooter>
                  <PromptInputTools>
                    <PromptInputButton variant="ghost" size="icon-sm" type="button" aria-label="Attach file">
                      <Paperclip className="h-4 w-4" />
                    </PromptInputButton>
                    <PromptInputButton variant="ghost" size="icon-sm" type="button" aria-label="Voice">
                      <Mic className="h-4 w-4" />
                    </PromptInputButton>
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      {isLoading ? "Streaming…" : "Aurora · gemini-3"}
                    </span>
                  </PromptInputTools>
                  <PromptInputSubmit status={status} disabled={!input.trim() && !isLoading} />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </motion.div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            NEXUS may produce inaccurate information. Verify important details.
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-28 w-28"
      >
        <div className="absolute inset-0 rounded-full bg-glow animate-pulse-glow" />
        <img src={orbImg} alt="" width={256} height={256} className="relative h-full w-full rounded-full object-cover shadow-glow-purple" />
      </motion.div>
      <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">
        How can I help you, <span className="text-aurora">today</span>?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">Start with a prompt or pick a suggestion below.</p>
      <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s.label}
            onClick={() => onPick(s.label)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="group flex items-start gap-3 rounded-xl glass p-3.5 text-left text-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.07] hover:shadow-glow-cyan"
          >
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-aurora/20 border border-white/10">
              <s.icon className="h-4 w-4 text-neon-cyan" />
            </div>
            <span className="text-foreground/90">{s.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
