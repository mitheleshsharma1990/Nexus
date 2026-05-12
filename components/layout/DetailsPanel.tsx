
import { getIssueById } from "@/data/issue";
import { getCommentsByIssueId } from "@/data/comments";
import { EditableIssueDetails } from "../issues/EditableIssueDetails";
import { getCachedStatuses, getCachedUsers, getCachedCycles } from "@/lib/cache/data";

export default async function DetailsPanel({ issueId }:
  { issueId: string }) {
  const [issue, comments, cycles, statuses, users] = await Promise.all([
    getIssueById(issueId),
    getCommentsByIssueId(issueId),
    getCachedCycles(),
    getCachedStatuses(),
    getCachedUsers()
  ])

  const cycleOptions = cycles.map(c => ({ id: c.id, name: c.name }))
  const statusOptions = statuses.map(s => ({ id: s.id, name: s.name }))
  const assigneesOptions = users.map(s => ({ id: s.id, name: s.name }))
  if (!issue) return <div>Issue not found</div>

  return <>
    <EditableIssueDetails issue={issue}
      cycleOptions={cycleOptions}
      statusOptions={statusOptions}
      assigneeOptions={assigneesOptions}
    />
    <p className="text-2xl font-bold mb-1">Comments ({comments.length})</p>
    {comments.map((comment) => (
      <p className="text-sm text-gray-400 mb-4" key={comment.id}>
        <input className="w-full border rounded-sm border-gray-300 py-1 px-2" type="text" defaultValue={comment.description} />
      </p>
    ))}
  </>
}