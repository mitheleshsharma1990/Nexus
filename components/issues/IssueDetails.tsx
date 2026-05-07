import { IssueWithRelations, Priority, Status } from "@/types";
import StatusChip from "../ui/StatusChip";
import PriorityChip from "../ui/PriorityChip";

export function IssueDetails({ issue }: { issue: IssueWithRelations | null }) {

  let status = {} as Status
  let priority = "low" as Priority
  if (issue && issue.status) {
    status = issue.status
  }
  if (issue && issue.priority) {
    priority = issue.priority
  }
  return <>
    <h1 className="text-2xl font-bold mb-4">Issue Details</h1>
    <p className="text-lg font-semibold">{issue?.cycle?.name || 'No cycle assigned'}</p>
    <hr className="my-4 border-t border-gray-300" />
    <p className="text-gray-300 mb-2">{issue?.title}</p>
    <p className="text-sm text-gray-400 mb-2">Status: <StatusChip status={status} /> </p>
    <p className="text-sm text-gray-400 mb-2">Assignee: {issue?.assignees?.map((assignee) => assignee.name).join(", ")}</p>
    <p className="text-sm text-gray-400 mb-2">Priority: <PriorityChip priority={priority} /></p>
    <hr className="my-4 border-t border-gray-300" />
    <p className="text-2xl font-bold mb-1">Description</p>
    <p className="text-sm text-gray-400 mb-4">{issue?.description}</p>
  </>
}