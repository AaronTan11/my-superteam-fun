"use client";

import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Add Event</h1>
      <p className="mt-1 text-sm text-muted-foreground">Create a new event.</p>
      <div className="mt-6">
        <EventForm />
      </div>
    </div>
  );
}
