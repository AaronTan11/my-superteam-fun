"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data, isLoading } = useQuery(trpc.admin.getUsers.queryOptions());
  const queryClient = useQueryClient();

  const setRoleMutation = useMutation(
    trpc.admin.setUserRole.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.admin.getUsers.queryOptions().queryKey });
        toast.success("Role updated");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }),
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage user roles and permissions.</p>

      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold mb-4">Users</h2>
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-sm font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={u.role}
                        onValueChange={(role) =>
                          setRoleMutation.mutate({
                            userId: u.id,
                            role: role as "admin" | "editor" | "user",
                          })
                        }
                      >
                        <SelectTrigger className="h-8 w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">
                            <Badge variant="default" className="text-xs">admin</Badge>
                          </SelectItem>
                          <SelectItem value="editor">
                            <Badge variant="secondary" className="text-xs">editor</Badge>
                          </SelectItem>
                          <SelectItem value="user">
                            <Badge variant="outline" className="text-xs">user</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
