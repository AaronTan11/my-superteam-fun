import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@my-superteam-fun/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as { role?: string }).role;
  if (role !== "admin" && role !== "editor") {
    redirect("/");
  }

  return (
    <AdminShell user={{ name: session.user.name, email: session.user.email, role: role ?? "user" }}>
      {children}
    </AdminShell>
  );
}
