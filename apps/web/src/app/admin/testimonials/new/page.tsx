"use client";

import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Add Testimonial</h1>
      <p className="mt-1 text-sm text-muted-foreground">Add a new community testimonial.</p>
      <div className="mt-6">
        <TestimonialForm />
      </div>
    </div>
  );
}
