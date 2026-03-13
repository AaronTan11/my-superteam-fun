"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { useParams } from "next/navigation";

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const { data: testimonials, isLoading } = useQuery(trpc.testimonials.list.queryOptions());
  const data = testimonials?.find((t) => t.id === id);

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!data) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Testimonial not found.</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Edit Testimonial</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update testimonial from {data.author}.</p>
      <div className="mt-6">
        <TestimonialForm initialData={data} />
      </div>
    </div>
  );
}
