"use client";

import { MemberForm } from "@/components/admin/member-form";

export default function NewMemberPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Add Member</h1>
      <p className="mt-1 text-sm text-muted-foreground">Create a new community member.</p>
      <div className="mt-6">
        <MemberForm />
      </div>
    </div>
  );
}
