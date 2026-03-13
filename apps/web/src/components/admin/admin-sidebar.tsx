"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Handshake,
  MessageSquareQuote,
  HelpCircle,
  BarChart3,
  Settings,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  user: { name: string; email: string; role: string };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-full w-60 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <span className="font-display text-sm font-bold text-primary">ST</span>
        </div>
        <div>
          <p className="font-display text-sm font-semibold">STMY Admin</p>
          <p className="text-xs text-muted-foreground">{user.role}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href as "/admin"}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "border-l-2 border-primary bg-primary/5 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
        <button
          onClick={() => authClient.signOut()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <div className="border-t border-border px-5 py-3">
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
    </aside>
  );
}
