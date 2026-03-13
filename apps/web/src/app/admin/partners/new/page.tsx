"use client";

import { PartnerForm } from "@/components/admin/partner-form";

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Add Partner</h1>
      <p className="mt-1 text-sm text-muted-foreground">Add a new ecosystem partner.</p>
      <div className="mt-6">
        <PartnerForm />
      </div>
    </div>
  );
}
