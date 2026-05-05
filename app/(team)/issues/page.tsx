

import IssuesList from "@/components/issues/IssuesList";
import DetailsPanel from "@/components/layout/DetailsPanel";
import FilterList from "@/components/filters/FilterList";

import { toArray } from '@/lib/utils/param';
import { Priority } from "@/types";

import NewIssueContainer from "@/components/issues/NewIssueContainer";
import { Suspense } from "react";
import { FilterBar } from "@/components/filters/FilterBar";


type IssuesPageProps = {
  searchParams: Promise<{
    issueId?: string
    statusId?: string | string[]
    priority?: string | string[]
    assigneeId?: string | string[]
  }>
}

export default async function IssuesPage({ searchParams }:
  IssuesPageProps) {
  const { issueId, statusId, priority, assigneeId } = await searchParams

  return <div className="flex flex-row h-19/20 w-5/6 m-4">
    <div className="flex flex-col gap-4 bg-[#224b3a] 
    border rounded-xl p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <ul className=" rounded-xl flex flex-row gap-1 mb-2">
        <li className="px-3 py-.5 rounded text-white bg-[#2D6A4F]">List</li>
        <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Board</li>
        <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Roadmap</li>
      </ul>

      <Suspense fallback={<div>Loading new Issue Button...</div>}>
        <NewIssueContainer />
      </Suspense>

      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterBar />
      </Suspense>

      <Suspense fallback={<div>Loading issues...</div>}>
        <IssuesList statusIds={toArray(statusId)} priorities={toArray(priority) as Priority[]} assigneeIds={toArray(assigneeId)} />
      </Suspense>

    </div>
    {issueId && <div className="h-full w-2/6 ml-4 p-4 border 
        rounded-xl bg-[#3f3d38]">
      <Suspense fallback={<div>Loading issue details...</div>}>
        <DetailsPanel issueId={issueId} />
      </Suspense>
    </div>
    }

  </div>


}