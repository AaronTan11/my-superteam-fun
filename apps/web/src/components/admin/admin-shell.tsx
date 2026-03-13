"use client";

import { AdminSidebar } from "./admin-sidebar";

interface AdminShellProps {
  children: React.ReactNode;
  user: { name: string; email: string; role: string };
}

export function AdminShell({ children, user }: AdminShellProps) {
  return (
    <div className="flex h-screen bg-background font-body">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
