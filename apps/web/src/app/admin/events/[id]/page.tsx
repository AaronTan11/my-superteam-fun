"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { EventForm } from "@/components/admin/event-form";
import { useParams } from "next/navigation";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery(trpc.events.getById.queryOptions({ id }));

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!data) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Event not found.</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Edit Event</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update {data.title}.</p>
      <div className="mt-6">
        <EventForm initialData={data} />
      </div>
    </div>
  );
}
