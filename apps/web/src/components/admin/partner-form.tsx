"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PartnerFormProps {
  initialData?: {
    id: string;
    name: string;
    logoUrl: string;
    websiteUrl: string;
    sortOrder: number;
  };
}

export function PartnerForm({ initialData }: PartnerFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(initialData?.websiteUrl ?? "");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);

  const createMutation = useMutation(
    trpc.partners.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.partners.list.queryOptions().queryKey });
        toast.success("Partner created");
        router.push("/admin/partners");
      },
    }),
  );

  const updateMutation = useMutation(
    trpc.partners.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.partners.list.queryOptions().queryKey });
        toast.success("Partner updated");
        router.push("/admin/partners");
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, logoUrl, websiteUrl, sortOrder };

    if (isEditing) {
      updateMutation.mutate({ id: initialData.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="logoUrl">Logo URL</Label>
        <Input id="logoUrl" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input id="websiteUrl" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort Order</Label>
        <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Update Partner" : "Create Partner"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/partners")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
