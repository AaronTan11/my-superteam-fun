"use client";

import { FaqForm } from "@/components/admin/faq-form";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Add FAQ</h1>
      <p className="mt-1 text-sm text-muted-foreground">Add a new frequently asked question.</p>
      <div className="mt-6">
        <FaqForm />
      </div>
    </div>
  );
}
