"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EventFormProps {
  initialData?: {
    id: string;
    title: string;
    date: Date | string;
    location: string;
    description: string;
    lumaUrl: string | null;
    isPast: boolean;
    sortOrder: number;
    [key: string]: unknown;
  };
}

export function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [date, setDate] = useState(
    initialData ? new Date(initialData.date).toISOString().slice(0, 16) : "",
  );
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [lumaUrl, setLumaUrl] = useState(initialData?.lumaUrl ?? "");
  const [isPast, setIsPast] = useState(initialData?.isPast ?? false);
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);

  const createMutation = useMutation(
    trpc.events.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.events.list.queryOptions().queryKey });
        toast.success("Event created");
        router.push("/admin/events");
      },
    }),
  );

  const updateMutation = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.events.list.queryOptions().queryKey });
        toast.success("Event updated");
        router.push("/admin/events");
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      date: new Date(date).toISOString(),
      location,
      description,
      lumaUrl: lumaUrl || undefined,
      isPast,
      sortOrder,
    };

    if (isEditing) {
      updateMutation.mutate({ id: initialData.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date & Time</Label>
        <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lumaUrl">Luma URL</Label>
        <Input id="lumaUrl" value={lumaUrl} onChange={(e) => setLumaUrl(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort Order</Label>
        <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={isPast} onCheckedChange={setIsPast} id="isPast" />
        <Label htmlFor="isPast">Past Event</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/events")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
