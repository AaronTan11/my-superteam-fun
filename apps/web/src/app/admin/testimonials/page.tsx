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

type Testimonial = {
  id: string;
  text: string;
  author: string;
  role: string;
  twitterHandle: string | null;
  sortOrder: number;
};

const columns: ColumnDef<Testimonial>[] = [
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.author}</p>
        <p className="text-xs text-muted-foreground">{row.original.role}</p>
      </div>
    ),
  },
  {
    accessorKey: "text",
    header: "Text",
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
        trpc.testimonials.delete.mutationOptions({
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.testimonials.list.queryOptions().queryKey });
            toast.success("Testimonial deleted");
          },
        }),
      );
      return (
        <div className="flex items-center gap-1">
          <Link href={`/admin/testimonials/${row.original.id}` as "/admin"}>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            title="Delete testimonial?"
            description={`This will permanently delete the testimonial from ${row.original.author}.`}
            onConfirm={() => deleteMutation.mutate({ id: row.original.id })}
            isPending={deleteMutation.isPending}
          />
        </div>
      );
    },
  },
];

export default function TestimonialsPage() {
  const { data, isLoading } = useQuery(trpc.testimonials.list.queryOptions());

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data?.length ?? 0} testimonials</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>
        ) : (
          <DataTable columns={columns} data={(data as Testimonial[]) ?? []} />
        )}
      </div>
    </div>
  );
}
