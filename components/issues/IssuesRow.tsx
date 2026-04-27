
import { IssueWithRelations } from "@/types"
import StatusChip from "../ui/StatusChip"
import PriorityChip from "../ui/PriorityChip"
export default function IssuesRow({ issue }: { issue: IssueWithRelations }) {
  return <div className="flex flex-row  
  gap-2 p-2 border rounded-xl bg-[#2D6A4F] text-white mx-1">
    <p>{issue.title}</p>
    <PriorityChip priority={issue.priority} />
    <StatusChip status={issue.status} />
  </div>
}