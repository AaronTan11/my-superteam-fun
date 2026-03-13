"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { DataTable } from "@/components/admin/data-table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

type Member = {
  id: string;
  name: string;
  title: string;
  company: string | null;
  photo: string;
  skills: string[];
  twitterHandle: string | null;
  isFeatured: boolean;
  sortOrder: number;
};

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.photo}
          alt={row.original.name}
          className="h-8 w-8 rounded-full bg-muted"
        />
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.title}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ getValue }) => getValue() || "—",
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1">
        {(getValue() as string[]).slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ getValue }) => (
      <Badge variant={getValue() ? "default" : "outline"}>
        {getValue() ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: function ActionsCell({ row }) {
      const queryClient = useQueryClient();
      const deleteMutation = useMutation(
        trpc.members.delete.mutationOptions({
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.members.list.queryOptions().queryKey });
            toast.success("Member deleted");
          },
        }),
      );
      return (
        <div className="flex items-center gap-1">
          <Link href={`/admin/members/${row.original.id}` as "/admin"}>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            title="Delete member?"
            description={`This will permanently delete ${row.original.name}.`}
            onConfirm={() => deleteMutation.mutate({ id: row.original.id })}
            isPending={deleteMutation.isPending}
          />
        </div>
      );
    },
  },
];

export default function MembersPage() {
  const { data, isLoading } = useQuery(trpc.members.list.queryOptions());

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data?.length ?? 0} members
          </p>
        </div>
        <Link href="/admin/members/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>
        ) : (
          <DataTable columns={columns} data={(data as Member[]) ?? []} />
        )}
      </div>
    </div>
  );
}
