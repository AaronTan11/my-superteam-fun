"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { MemberForm } from "@/components/admin/member-form";
import { useParams } from "next/navigation";

export default function EditMemberPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery(trpc.members.getById.queryOptions({ id }));

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!data) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Member not found.</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Edit Member</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update {data.name}.</p>
      <div className="mt-6">
        <MemberForm initialData={data} />
      </div>
    </div>
  );
}
