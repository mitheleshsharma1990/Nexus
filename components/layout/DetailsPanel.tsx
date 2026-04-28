import { IssueWithRelations, Comment } from "@/types"
import CloseDetailsButton from "../issues/CloseDetailsButton";

export default function DetailsPanel({ issue, comments }: { issue: IssueWithRelations, comments: Comment[] }) {

  return <div className="h-full w-2/6 ml-4 p-4 border 
  rounded-xl bg-[#3f3d38]">
    <h1 className="text-2xl font-bold mb-4">Issue Details</h1>
    <CloseDetailsButton />
    <p className="text-lg font-semibold">{issue.cycleId}</p>
    <hr className="my-4 border-t border-gray-300" />
    <p className="text-gray-300">{issue.title}</p>
    <p className="text-sm text-gray-400">Status: {issue.status.name}</p>
    <p className="text-sm text-gray-400">Assignee: {issue.assignees.map((assignee) => assignee.name).join(", ")}</p>
    <p className="text-sm text-gray-400">Priority: {issue.priority}</p>
    <hr className="my-4 border-t border-gray-300" />
    <p className="text-2xl font-bold mb-1">Description</p>
    <p className="text-sm text-gray-400 mb-4">{issue.description}</p>
    <p className="text-2xl font-bold mb-1">Comments ({comments.length})</p>
    {comments.map((comment) => (
      <p className="text-sm text-gray-400 mb-4" key={comment.id}>
        <input className="w-full border rounded-sm border-gray-300 py-1 px-2" type="text" defaultValue={comment.description} />
      </p>
    ))}
  </div>
}