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

interface FaqFormProps {
  initialData?: {
    id: string;
    question: string;
    answer: string;
    sortOrder: number;
  };
}

export function FaqForm({ initialData }: FaqFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const [question, setQuestion] = useState(initialData?.question ?? "");
  const [answer, setAnswer] = useState(initialData?.answer ?? "");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);

  const createMutation = useMutation(
    trpc.faq.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.faq.list.queryOptions().queryKey });
        toast.success("FAQ item created");
        router.push("/admin/faq");
      },
    }),
  );

  const updateMutation = useMutation(
    trpc.faq.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.faq.list.queryOptions().queryKey });
        toast.success("FAQ item updated");
        router.push("/admin/faq");
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { question, answer, sortOrder };

    if (isEditing) {
      updateMutation.mutate({ id: initialData.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="answer">Answer</Label>
        <Textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required rows={5} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort Order</Label>
        <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/faq")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
