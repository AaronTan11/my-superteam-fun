"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MemberFormProps {
  initialData?: {
    id: string;
    name: string;
    title: string;
    company: string | null;
    photo: string;
    skills: string[];
    twitterHandle: string | null;
    isFeatured: boolean;
    achievements: string[] | null;
    sortOrder: number;
    [key: string]: unknown;
  };
}

export function MemberForm({ initialData }: MemberFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [company, setCompany] = useState(initialData?.company ?? "");
  const [photo, setPhoto] = useState(initialData?.photo ?? "");
  const [skills, setSkills] = useState(initialData?.skills?.join(", ") ?? "");
  const [twitterHandle, setTwitterHandle] = useState(initialData?.twitterHandle ?? "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [achievements, setAchievements] = useState(initialData?.achievements?.join(", ") ?? "");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);

  const createMutation = useMutation(
    trpc.members.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.members.list.queryOptions().queryKey });
        toast.success("Member created");
        router.push("/admin/members");
      },
    }),
  );

  const updateMutation = useMutation(
    trpc.members.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.members.list.queryOptions().queryKey });
        toast.success("Member updated");
        router.push("/admin/members");
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      title,
      company: company || undefined,
      photo,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      twitterHandle: twitterHandle || undefined,
      isFeatured,
      achievements: achievements.split(",").map((s) => s.trim()).filter(Boolean),
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
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter Handle</Label>
        <Input id="twitter" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="achievements">Achievements (comma-separated)</Label>
        <Input id="achievements" value={achievements} onChange={(e) => setAchievements(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort Order</Label>
        <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={isFeatured} onCheckedChange={setIsFeatured} id="featured" />
        <Label htmlFor="featured">Featured</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Update Member" : "Create Member"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/members")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
