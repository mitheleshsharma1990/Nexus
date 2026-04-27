
import { Issue } from "@/types"

export default function IssuesRow({ issue }: { issue: Issue }) {
  return <div className="flex flex-row  
  gap-2 p-2 border rounded-xl bg-[#2D6A4F] text-white mx-1">
    <p>{issue.title}</p>
    <p>{issue.priority}</p>
    <p>{issue.statusId}</p>
  </div>
}