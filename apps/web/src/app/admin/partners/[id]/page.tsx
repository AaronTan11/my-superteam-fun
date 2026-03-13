"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { PartnerForm } from "@/components/admin/partner-form";
import { useParams } from "next/navigation";

export default function EditPartnerPage() {
  const { id } = useParams<{ id: string }>();
  const { data: partners, isLoading } = useQuery(trpc.partners.list.queryOptions());
  const data = partners?.find((p) => p.id === id);

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!data) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Partner not found.</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Edit Partner</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update {data.name}.</p>
      <div className="mt-6">
        <PartnerForm initialData={data} />
      </div>
    </div>
  );
}
