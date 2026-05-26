import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Workflow,
  FileSearch,
  Zap,
  Mic,
  Bot,
  BarChart3,
  ArrowRight,
  Play,
  Check,
  Star,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import orbImg from "@/assets/nexus-orb.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS AI — The Future of Intelligent Conversations" },
      {
        name: "description",
        content:
          "NEXUS AI is the next-generation AI operating system for conversations, automation, research and workflow execution. Ultra-premium intelligence, built for teams.",
      },
      { property: "og:title", content: "NEXUS AI — The Future of Intelligent Conversations" },
      { property: "og:description", content: "Next-generation AI for conversations, automation, research and workflow execution." },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundFX />
      <Nav />
      <Hero />
      <Showcase />
      <Features />
      <Testimonials />
      <Pricing />
      <CTABand />
      <Footer />
    </div>
  );
}

function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none fixed -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.7_0.25_300/0.25)] blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.85_0.18_200/0.2)] blur-[120px]" />
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-lg bg-aurora opacity-80 blur-[6px]" />
            <div className="relative grid h-full w-full place-items-center rounded-lg bg-[oklch(0.14_0.03_270)] border border-white/10">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            NEXUS<span className="text-aurora"> AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {["Product", "Features", "Pricing", "Docs"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            Dashboard
          </Link>
          <Link to="/chat">
            <Button className="bg-aurora text-[oklch(0.12_0.03_270)] font-medium hover:opacity-90 shadow-glow-purple">
              Launch app
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-24 md:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-glow-cyan" />
            Introducing NEXUS AI v3 — Aurora Engine
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            The future of <br />
            <span className="text-aurora">intelligent conversations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            A next-generation AI operating system for conversations, research,
            automation and workflow execution — engineered for teams that ship at the speed of thought.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link to="/chat">
              <Button size="lg" className="bg-aurora text-[oklch(0.12_0.03_270)] font-semibold hover:opacity-90 shadow-glow-purple">
                Start chatting <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/15 bg-white/5 backdrop-blur hover:bg-white/10">
              <Play className="mr-2 h-4 w-4" /> Watch demo
            </Button>
          </motion.div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-aurora" style={{ filter: `hue-rotate(${i * 30}deg)` }} />
              ))}
            </div>
            <span>Trusted by 12,000+ engineers and operators worldwide</span>
          </div>
        </div>

        {/* Orb */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="absolute inset-0"
          >
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-white/5" />
          </motion.div>
          <div className="absolute inset-0 rounded-full bg-glow animate-pulse-glow" />
          <motion.img
            src={orbImg}
            alt="NEXUS AI Orb"
            width={1024}
            height={1024}
            className="relative h-full w-full rounded-full object-cover"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating particles */}
          {[
            { top: "10%", left: "8%" },
            { top: "70%", left: "85%" },
            { top: "85%", left: "15%" },
            { top: "20%", left: "90%" },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-glow-cyan"
              style={s}
              animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const showcaseItems = [
  { icon: Brain, title: "AI Reasoning", desc: "Multi-step thinking across complex problems." },
  { icon: Workflow, title: "Automation", desc: "Trigger and orchestrate cross-app workflows." },
  { icon: FileSearch, title: "Research", desc: "Synthesize the web, papers and your docs." },
  { icon: BarChart3, title: "Data analysis", desc: "Query, visualize and explain datasets." },
  { icon: Zap, title: "Real-time", desc: "Sub-second streaming and tool execution." },
  { icon: Bot, title: "Agents", desc: "Specialist agents that act on your behalf." },
];

function Showcase() {
  return (
    <section id="product" className="relative mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          One platform. <span className="text-aurora">Every workflow.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          NEXUS unifies the AI capabilities your team uses every day — chat,
          research, analysis, automation — into one cinematic surface.
        </p>
      </motion.div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {showcaseItems.map((it, i) => (
          <motion.div key={it.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
            <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all hover:bg-white/[0.06]">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-aurora opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 border border-white/10">
                  <it.icon className="h-5 w-5 text-neon-cyan" />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const features = [
  { icon: Brain, title: "Context-aware memory", desc: "Persistent context across every conversation, project and team member." },
  { icon: Zap, title: "Real-time responses", desc: "Streamed tokens at the edge for instant, fluid interactions." },
  { icon: Sparkles, title: "Multi-model intelligence", desc: "Route between frontier models automatically for best results." },
  { icon: FileSearch, title: "File understanding", desc: "Drop in PDFs, images, code or spreadsheets — NEXUS reads them all." },
  { icon: Workflow, title: "Workflow automation", desc: "Compose multi-step agents that act across your stack." },
  { icon: Mic, title: "Voice interaction", desc: "Speak naturally. Get studio-quality responses, hands-free." },
  { icon: Bot, title: "Specialist agents", desc: "Pre-built and custom agents tuned to your domain." },
  { icon: BarChart3, title: "Smart analytics", desc: "Usage, performance and cost — all in one dashboard." },
];

function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Built for the <span className="text-aurora">next decade</span> of work
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every primitive you need to ship intelligence — assembled with obsessive craft.
        </p>
      </motion.div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }}>
            <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-glow-purple">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-aurora/20 border border-white/10">
                <f.icon className="h-5 w-5 text-neon-cyan" />
              </div>
              <h3 className="mt-4 font-display text-base font-medium">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Ava Chen", role: "Head of Research, Lumen Labs", text: "NEXUS replaced four tools in a week. Our research velocity doubled." },
  { name: "Marcus Reid", role: "CTO, Strata Systems", text: "Our engineers ship faster with NEXUS agents than any tool we've tried." },
  { name: "Priya Natarajan", role: "VP Product, Northwave", text: "The interface alone is worth the subscription. It feels like the future." },
];

function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Loved by teams that <span className="text-aurora">move first</span>
        </h2>
      </motion.div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <div className="relative h-full rounded-2xl glass p-6">
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-neon-cyan text-neon-cyan" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-aurora" style={{ filter: `hue-rotate(${i * 40}deg)` }} />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Starter",
    price: "$0",
    desc: "For individuals exploring intelligent workflows.",
    features: ["500 messages / month", "Single workspace", "Standard models", "Email support"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For power users and small teams building daily.",
    features: ["Unlimited messages", "All frontier models", "File understanding", "Voice mode", "Priority support"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "SSO, audit logs, custom agents and dedicated infra.",
    features: ["Custom agents", "SSO & SCIM", "Private deployment", "99.99% SLA", "Dedicated CSM"],
    cta: "Talk to sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Simple, <span className="text-aurora">superhuman</span> pricing
        </h2>
        <p className="mt-4 text-muted-foreground">Start free. Upgrade when your team is ready.</p>
      </motion.div>
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <div
              className={`relative h-full rounded-3xl p-7 ${
                t.highlight
                  ? "border-aurora glass-strong shadow-glow-purple"
                  : "glass"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-aurora px-3 py-1 text-xs font-medium text-[oklch(0.12_0.03_270)]">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-xl font-medium">{t.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">{t.price}</span>
                {t.price !== "Custom" && <span className="text-sm text-muted-foreground">/mo</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-aurora/20">
                      <Check className="h-3 w-3 text-neon-cyan" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/chat" className="mt-8 block">
                <Button
                  className={`w-full ${
                    t.highlight
                      ? "bg-aurora text-[oklch(0.12_0.03_270)] hover:opacity-90"
                      : "bg-white/5 border border-white/15 hover:bg-white/10"
                  }`}
                  size="lg"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-12 text-center">
        <div className="pointer-events-none absolute inset-0 bg-glow opacity-60" />
        <div className="relative">
          <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Step into the <span className="text-aurora">aurora</span>.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Join the teams already building with NEXUS AI.
          </p>
          <Link to="/chat" className="mt-7 inline-block">
            <Button size="lg" className="bg-aurora text-[oklch(0.12_0.03_270)] font-semibold hover:opacity-90 shadow-glow-purple">
              Launch NEXUS <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-12 pt-8">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-aurora">
            <Sparkles className="h-3.5 w-3.5 text-[oklch(0.12_0.03_270)]" />
          </div>
          <span className="font-display text-sm font-medium">NEXUS AI</span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
          {["Privacy", "Terms", "Security", "Status"].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {[Twitter, Github, Linkedin].map((I, i) => (
            <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-white/30 hover:text-foreground hover:shadow-glow-cyan">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
