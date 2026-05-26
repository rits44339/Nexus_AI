import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useThreads } from "@/lib/threads";
import { Sparkles, Plus, MessageSquare, Trash2, LayoutDashboard, Workflow, FolderClosed, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatSidebar() {
  const { threads, create, remove } = useThreads();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleNew = () => {
    const t = create();
    navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    remove(id);
    if (pathname.includes(id)) navigate({ to: "/chat" });
  };

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-[oklch(0.1_0.025_270/0.7)] backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-aurora">
            <Sparkles className="h-3.5 w-3.5 text-[oklch(0.12_0.03_270)]" />
          </div>
          <span className="font-display text-sm font-semibold">NEXUS AI</span>
        </Link>
      </div>

      <div className="px-3">
        <Button
          onClick={handleNew}
          className="w-full justify-start gap-2 bg-aurora text-[oklch(0.12_0.03_270)] font-medium hover:opacity-90 shadow-glow-purple"
        >
          <Plus className="h-4 w-4" /> New conversation
        </Button>
      </div>

      <div className="mt-3 px-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          <input
            placeholder="Search conversations"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      <nav className="mt-4 px-3">
        <SidebarSection title="Workspace">
          <SideLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={pathname === "/dashboard"} />
          <SideLink to="/chat" icon={MessageSquare} label="Chat" active={pathname.startsWith("/chat")} />
          <SideItem icon={Workflow} label="Workflows" badge="3" />
          <SideItem icon={FolderClosed} label="Folders" />
        </SidebarSection>
      </nav>

      <div className="mt-4 flex-1 overflow-hidden px-3">
        <div className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
          Recent
        </div>
        <div className="h-full space-y-0.5 overflow-y-auto pb-32">
          {threads.length === 0 && (
            <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-xs text-muted-foreground">
              Your conversations appear here.
            </div>
          )}
          {threads.map((t) => {
            const active = pathname === `/chat/${t.id}`;
            return (
              <div
                key={t.id}
                className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                  active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Link
                  to="/chat/$threadId"
                  params={{ threadId: t.id }}
                  className="flex min-w-0 flex-1 items-center gap-2"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  <span className="truncate text-xs">{t.title}</span>
                </Link>
                <button
                  onClick={(e) => handleDelete(e, t.id)}
                  className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/5 p-3">
        <button className="flex w-full items-center gap-2 rounded-lg p-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground">
          <Settings className="h-4 w-4" /> Settings
        </button>
        <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
          <div className="h-8 w-8 rounded-full bg-aurora" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium">Aurora user</div>
            <div className="truncate text-[10px] text-muted-foreground">Pro plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">{title}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function SideLink({ to, icon: Icon, label, active }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
        active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </Link>
  );
}

function SideItem({ icon: Icon, label, badge }: { icon: React.ComponentType<{ className?: string }>; label: string; badge?: string }) {
  return (
    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="rounded-md bg-white/10 px-1.5 text-[10px]">{badge}</span>
      )}
    </button>
  );
}
