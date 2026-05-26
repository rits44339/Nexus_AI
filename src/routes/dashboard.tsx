import { createFileRoute, Link } from "@tanstack/react-router";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, MessageSquare, Zap, Cpu, ArrowRight, Activity, Workflow, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Workspace — NEXUS AI" }] }),
  component: Dashboard,
});

const usage = [
  { d: "Mon", v: 420 },
  { d: "Tue", v: 680 },
  { d: "Wed", v: 540 },
  { d: "Thu", v: 920 },
  { d: "Fri", v: 1240 },
  { d: "Sat", v: 1080 },
  { d: "Sun", v: 1620 },
];
const tokens = [
  { d: "W1", v: 12 },
  { d: "W2", v: 18 },
  { d: "W3", v: 22 },
  { d: "W4", v: 31 },
  { d: "W5", v: 28 },
  { d: "W6", v: 38 },
];

function Dashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar />
      <main className="relative flex-1 overflow-y-auto">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-6xl px-8 py-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Workspace</div>
              <h1 className="font-display text-3xl font-semibold tracking-tight">
                Welcome back to <span className="text-aurora">NEXUS</span>
              </h1>
            </div>
            <Link to="/chat">
              <Button className="bg-aurora text-[oklch(0.12_0.03_270)] hover:opacity-90 shadow-glow-purple">
                New conversation <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { icon: MessageSquare, label: "Conversations", value: "248", trend: "+18%" },
              { icon: Zap, label: "Workflows run", value: "1,392", trend: "+42%" },
              { icon: Cpu, label: "Tokens", value: "5.4M", trend: "+12%" },
              { icon: Activity, label: "Avg latency", value: "320ms", trend: "−9%" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl glass p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-aurora/20 border border-white/10">
                    <m.icon className="h-4 w-4 text-neon-cyan" />
                  </div>
                  <span className="text-[11px] text-neon-cyan">{m.trend}</span>
                </div>
                <div className="mt-4 font-display text-2xl font-semibold">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl glass p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-medium">AI usage</div>
                  <div className="text-xs text-muted-foreground">Messages per day · last 7d</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-neon-cyan">
                  <TrendingUp className="h-3.5 w-3.5" /> +37% w/w
                </div>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usage}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.78 0.18 230)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="oklch(0.7 0.25 300)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="d" stroke="oklch(0.72 0.03 260)" tickLine={false} axisLine={false} fontSize={11} />
                    <YAxis stroke="oklch(0.72 0.03 260)" tickLine={false} axisLine={false} fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.14 0.03 270)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="v" stroke="oklch(0.85 0.18 200)" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl glass p-5">
              <div className="font-display text-lg font-medium">Token spend</div>
              <div className="text-xs text-muted-foreground">Millions · last 6 weeks</div>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tokens}>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="d" stroke="oklch(0.72 0.03 260)" tickLine={false} axisLine={false} fontSize={11} />
                    <Tooltip contentStyle={{ background: "oklch(0.14 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="v" fill="oklch(0.7 0.25 300)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl glass p-5">
              <div className="mb-3 flex items-center gap-2">
                <Workflow className="h-4 w-4 text-neon-cyan" />
                <div className="font-display text-base font-medium">Active workflows</div>
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Daily revenue digest", status: "Running", time: "2m ago" },
                  { name: "Support triage agent", status: "Running", time: "5m ago" },
                  { name: "Competitor signal scan", status: "Queued", time: "12m ago" },
                ].map((w) => (
                  <li key={w.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                    <div>
                      <div className="text-sm">{w.name}</div>
                      <div className="text-[11px] text-muted-foreground">{w.time}</div>
                    </div>
                    <span className="rounded-full bg-aurora/20 px-2 py-0.5 text-[10px] text-neon-cyan">{w.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl glass p-5">
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4 text-neon-cyan" />
                <div className="font-display text-base font-medium">Agents</div>
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Research analyst", runs: "184 runs" },
                  { name: "Code architect", runs: "212 runs" },
                  { name: "Growth strategist", runs: "97 runs" },
                ].map((a) => (
                  <li key={a.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-aurora" />
                      <div className="text-sm">{a.name}</div>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{a.runs}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
