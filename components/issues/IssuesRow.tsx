"use client"

import { IssueWithRelations } from "@/types";
import StatusChip from "../ui/StatusChip";
import PriorityChip from "../ui/PriorityChip";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function IssuesRow({ issue }: { issue: IssueWithRelations }) {
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())
  params.set('issueId', issue.id)
  const url = `/issues?${params.toString()}`

  return <Link href={url} className="flex flex-row items-center gap-2 p-2 mr-4 border rounded-xl bg-[#2D6A4F] text-white mx-1 hover:bg-[#1B4332] transition-colors">
    <p className="flex-1">{issue.title}</p>
    <PriorityChip priority={issue.priority} />
    <StatusChip status={issue.status} />
  </Link>
}