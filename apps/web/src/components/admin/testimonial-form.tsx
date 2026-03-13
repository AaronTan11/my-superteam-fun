"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TestimonialFormProps {
  initialData?: {
    id: string;
    text: string;
    author: string;
    role: string;
    twitterHandle: string | null;
    sortOrder: number;
  };
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const [text, setText] = useState(initialData?.text ?? "");
  const [author, setAuthor] = useState(initialData?.author ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [twitterHandle, setTwitterHandle] = useState(initialData?.twitterHandle ?? "");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);

  const createMutation = useMutation(
    trpc.testimonials.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.testimonials.list.queryOptions().queryKey });
        toast.success("Testimonial created");
        router.push("/admin/testimonials");
      },
    }),
  );

  const updateMutation = useMutation(
    trpc.testimonials.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.testimonials.list.queryOptions().queryKey });
        toast.success("Testimonial updated");
        router.push("/admin/testimonials");
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      text,
      author,
      role,
      twitterHandle: twitterHandle || undefined,
      sortOrder,
    };

    if (isEditing) {
      updateMutation.mutate({ id: initialData.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} required rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter Handle</Label>
        <Input id="twitter" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort Order</Label>
        <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/testimonials")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
