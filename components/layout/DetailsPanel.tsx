import { Issue, Comment } from "@/types"

export default function DetailsPanel() {
  let issue: Issue = {
    id: "1",
    title: "Set up a auth service",
    description: "We need to set up an auth service for our application. This service will handle user authentication and authorization. We can use JWT tokens for authentication and role-based access control for authorization.",
    statusId: "open",
    priority: "high",
    assigneeIds: ["1"],
    projectId: "1",
    cycleId: "ENG -142",
    createdAt: new Date(),
    dueDate: new Date(),
  }
  let comments: Comment[] = [{
    id: "1",
    description: "This is a comment on the issue.",
    issueId: "1",
    authorId: "1",
    createdAt: new Date(),
  },
  {
    id: "2",
    description: "This is another comment on the issue.",
    issueId: "1",
    authorId: "2",
    createdAt: new Date(),
  }
  ]
  return <div className="h-full w-2/6 m-4 p-4 border rounded-xl bg-[#3f3d38]">
    <h1 className="text-2xl font-bold mb-4">Issue Details</h1>
    <p className="text-lg font-semibold">{issue.cycleId}</p>
    <hr className="my-4 border-t border-gray-300" />
    <p className="text-gray-300">{issue.title}</p>
    <p className="text-sm text-gray-400">Status: {issue.statusId}</p>
    <p className="text-sm text-gray-400">Assignee: {issue.assigneeIds.join(", ")}</p>
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