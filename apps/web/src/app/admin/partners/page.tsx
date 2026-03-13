"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { DataTable } from "@/components/admin/data-table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

type Partner = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: number;
};

const columns: ColumnDef<Partner>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "websiteUrl",
    header: "Website",
    cell: ({ getValue }) => (
      <a
        href={getValue() as string}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        {new URL(getValue() as string).hostname}
        <ExternalLink className="h-3 w-3" />
      </a>
    ),
  },
  {
    accessorKey: "sortOrder",
    header: "Order",
  },
  {
    id: "actions",
    header: "",
    cell: function ActionsCell({ row }) {
      const queryClient = useQueryClient();
      const deleteMutation = useMutation(
        trpc.partners.delete.mutationOptions({
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.partners.list.queryOptions().queryKey });
            toast.success("Partner deleted");
          },
        }),
      );
      return (
        <div className="flex items-center gap-1">
          <Link href={`/admin/partners/${row.original.id}` as "/admin"}>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            title="Delete partner?"
            description={`This will permanently delete ${row.original.name}.`}
            onConfirm={() => deleteMutation.mutate({ id: row.original.id })}
            isPending={deleteMutation.isPending}
          />
        </div>
      );
    },
  },
];

export default function PartnersPage() {
  const { data, isLoading } = useQuery(trpc.partners.list.queryOptions());

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Partners</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data?.length ?? 0} partners</p>
        </div>
        <Link href="/admin/partners/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>
        ) : (
          <DataTable columns={columns} data={(data as Partner[]) ?? []} />
        )}
      </div>
    </div>
  );
}
