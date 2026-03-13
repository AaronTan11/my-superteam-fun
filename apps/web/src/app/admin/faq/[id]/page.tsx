"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { FaqForm } from "@/components/admin/faq-form";
import { useParams } from "next/navigation";

export default function EditFaqPage() {
  const { id } = useParams<{ id: string }>();
  const { data: faqItems, isLoading } = useQuery(trpc.faq.list.queryOptions());
  const data = faqItems?.find((f) => f.id === id);

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!data) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">FAQ item not found.</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Edit FAQ</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update this FAQ item.</p>
      <div className="mt-6">
        <FaqForm initialData={data} />
      </div>
    </div>
  );
}
