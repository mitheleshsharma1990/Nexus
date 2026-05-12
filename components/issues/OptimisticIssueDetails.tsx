

import { IssueWithRelations } from "@/types";
import { EditableIssueDetails } from "./EditableIssueDetails";

export default function OptimisticIssueDetails({ issue }:
  { issue: IssueWithRelations | null }) {


  return <>
    <EditableIssueDetails issue={issue} cycleOptions={[]} statusOptions={[]}
      assigneeOptions={[]} />
    <div className="mt-4">
      <h3 className="text-sm text-gray-400 mb-2">Comments</h3>
      <div className="flex flex-col gap-2">
        {[1, 2].map(i => (
          <div key={i} className="h-8 bg-[#344E41] rounded animate-pulse" />
        ))}
      </div>
    </div>
  </>

}

