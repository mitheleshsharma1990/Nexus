

import IssuesList from "@/components/issues/IssuesList";
import { getFilteredIssues, getIssueById } from "@/data/issue";
import DetailsPanel from "@/components/layout/DetailsPanel";
import { Priority } from "@/types";
import { getCommentsByIssueId } from "@/data/comments";


type IssuesPageProps = {
  searchParams: Promise<{
    issueId?: string
    statusId?: string
    priority?: string
  }>
}

export default async function IssuesPage({ searchParams }:
  IssuesPageProps) {
  const { issueId, statusId, priority } = await searchParams
  const [issues, selectedIssue] = await Promise.all([
    getFilteredIssues({
      statusId: statusId,
      priority: priority as Priority | undefined,
    }),
    issueId
      ? getIssueById(issueId)
      : null
  ])
  const comments = selectedIssue ? await getCommentsByIssueId(selectedIssue.id) : []
  console.log(selectedIssue?.title)
  return <div className="flex flex-row h-19/20 w-5/6 m-4">
    <div className="flex flex-col gap-4 bg-[#224b3a] 
    border rounded-xl p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <ul className=" rounded-xl flex flex-row gap-1 mb-2">
        <li className="px-3 py-.5 rounded text-white bg-[#2D6A4F]">List</li>
        <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Board</li>
        <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Roadmap</li>
      </ul>
      <IssuesList issues={issues} />
    </div>
    {selectedIssue && <DetailsPanel issue={selectedIssue} comments={comments} />}
  </div>


}