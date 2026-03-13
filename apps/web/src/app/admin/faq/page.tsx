"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { DataTable } from "@/components/admin/data-table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

const columns: ColumnDef<FaqItem>[] = [
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ getValue }) => <span className="font-medium">{getValue() as string}</span>,
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ getValue }) => (
      <p className="max-w-sm truncate text-sm text-muted-foreground">{getValue() as string}</p>
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
        trpc.faq.delete.mutationOptions({
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.faq.list.queryOptions().queryKey });
            toast.success("FAQ item deleted");
          },
        }),
      );
      return (
        <div className="flex items-center gap-1">
          <Link href={`/admin/faq/${row.original.id}` as "/admin"}>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            title="Delete FAQ item?"
            description="This will permanently delete this FAQ item."
            onConfirm={() => deleteMutation.mutate({ id: row.original.id })}
            isPending={deleteMutation.isPending}
          />
        </div>
      );
    },
  },
];

export default function FaqPage() {
  const { data, isLoading } = useQuery(trpc.faq.list.queryOptions());

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">FAQ</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data?.length ?? 0} items</p>
        </div>
        <Link href="/admin/faq/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>
        ) : (
          <DataTable columns={columns} data={(data as FaqItem[]) ?? []} />
        )}
      </div>
    </div>
  );
}
