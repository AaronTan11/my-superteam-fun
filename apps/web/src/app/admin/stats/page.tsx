"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function StatsPage() {
  const { data, isLoading } = useQuery(trpc.stats.list.queryOptions());
  const queryClient = useQueryClient();

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Stats</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit community statistics displayed on the site.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((stat) => (
          <StatCard key={stat.id} stat={stat} queryClient={queryClient} />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  stat,
  queryClient,
}: {
  stat: { id: string; value: number; suffix: string; label: string; sortOrder: number };
  queryClient: ReturnType<typeof useQueryClient>;
}) {
  const [value, setValue] = useState(stat.value);
  const [suffix, setSuffix] = useState(stat.suffix);
  const [label, setLabel] = useState(stat.label);

  const updateMutation = useMutation(
    trpc.stats.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.stats.list.queryOptions().queryKey });
        toast.success(`${label} updated`);
      },
    }),
  );

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="text-center">
        <span className="font-display text-3xl font-bold text-primary">
          {value}{suffix}
        </span>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs">Label</Label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} className="h-8 text-sm" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="h-8 text-sm"
            />
          </div>
          <div className="w-20 space-y-1">
            <Label className="text-xs">Suffix</Label>
            <Input value={suffix} onChange={(e) => setSuffix(e.target.value)} className="h-8 text-sm" />
          </div>
        </div>
        <Button
          size="sm"
          className="w-full"
          disabled={updateMutation.isPending}
          onClick={() =>
            updateMutation.mutate({ id: stat.id, value, suffix, label })
          }
        >
          {updateMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
