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

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  isPast: boolean;
  [key: string]: unknown;
};

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) =>
      new Date(getValue() as string).toLocaleDateString("en-MY", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "isPast",
    header: "Status",
    cell: ({ getValue }) => (
      <Badge variant={getValue() ? "secondary" : "default"}>
        {getValue() ? "Past" : "Upcoming"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: function ActionsCell({ row }) {
      const queryClient = useQueryClient();
      const deleteMutation = useMutation(
        trpc.events.delete.mutationOptions({
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.events.list.queryOptions().queryKey });
            toast.success("Event deleted");
          },
        }),
      );
      return (
        <div className="flex items-center gap-1">
          <Link href={`/admin/events/${row.original.id}` as "/admin"}>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            title="Delete event?"
            description={`This will permanently delete "${row.original.title}".`}
            onConfirm={() => deleteMutation.mutate({ id: row.original.id })}
            isPending={deleteMutation.isPending}
          />
        </div>
      );
    },
  },
];

export default function EventsPage() {
  const { data, isLoading } = useQuery(trpc.events.list.queryOptions());

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data?.length ?? 0} events</p>
        </div>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>
        ) : (
          <DataTable columns={columns} data={(data as Event[]) ?? []} />
        )}
      </div>
    </div>
  );
}
