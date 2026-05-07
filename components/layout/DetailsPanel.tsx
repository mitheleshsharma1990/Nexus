
import { getIssueById } from "@/data/issue";
import { getCommentsByIssueId } from "@/data/comments";
import { IssueDetails } from "../issues/IssueDetails";


export default async function DetailsPanel({ issueId }:
  { issueId: string }) {
  const [issue, comments] = await Promise.all([
    getIssueById(issueId),
    getCommentsByIssueId(issueId)
  ])

  if (!issue) return <div>Issue not found</div>

  return <>
    <IssueDetails issue={issue} />
    <p className="text-2xl font-bold mb-1">Comments ({comments.length})</p>
    {comments.map((comment) => (
      <p className="text-sm text-gray-400 mb-4" key={comment.id}>
        <input className="w-full border rounded-sm border-gray-300 py-1 px-2" type="text" defaultValue={comment.description} />
      </p>
    ))}
  </>
}