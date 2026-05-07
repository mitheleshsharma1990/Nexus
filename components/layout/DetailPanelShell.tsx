"use client";

import { useState, useEffect, Suspense } from "react";
import DetailsSkeleton from "@/components/ui/DetailsSkeleton";
import { useSearchParams, useRouter } from "next/navigation";
import CloseDetailsButton from "../issues/CloseDetailsButton";
import { useNavigation } from '@/context/NavigationContext';
import OptimisticIssueDetails from "@/components/issues/OptimisticIssueDetails";
export default function DetailPanelShell({ issueId, children }: { issueId: string, children: React.ReactNode }) {

  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter()
  const { optimisticIssue, endNavigation } = useNavigation()

  const handleClose = () => {
    setIsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('issueId')
    router.push(`/issues?${params.toString()}`)
  }
  useEffect(() => {
    setIsOpen(true)
    endNavigation()
  }, [issueId])

  if (!isOpen) return null;

  return <div className="h-full w-2/6 ml-4 p-4 border 
        rounded-xl bg-[#3f3d38]" key={issueId}>
    <CloseDetailsButton handleClose={handleClose} />
    <Suspense fallback={<DetailsSkeleton />}>
      {optimisticIssue ? <OptimisticIssueDetails issue={optimisticIssue} /> : children}
    </Suspense>
  </div>
}