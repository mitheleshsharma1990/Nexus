

import IssuesList from "@/components/issues/IssuesList";
import { getFilteredIssues, getIssueById } from "@/data/issue";
import DetailsPanel from "@/components/layout/DetailsPanel";
import { getCommentsByIssueId } from "@/data/comments";
import FilterList from "@/components/filters/FilterList";
import { getStatuses } from "@/data/statuses";
import { getUsers } from "@/data/users";
import { toArray } from '@/lib/utils/param';
import { Priority } from "@/types";

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
  const [issues, selectedIssue, statuses, users] = await Promise.all([
    getFilteredIssues({
      statusIds: toArray(statusId),
      priorities: toArray(priority) as Priority[],
      assigneeIds: toArray(assigneeId),
    }),
    issueId
      ? getIssueById(issueId)
      : null,
    getStatuses(),
    getUsers()
  ])
  const comments = selectedIssue ? await getCommentsByIssueId(selectedIssue.id)
    : []

  return <div className="flex flex-row h-19/20 w-5/6 m-4">
    <div className="flex flex-col gap-4 bg-[#224b3a] 
    border rounded-xl p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <ul className=" rounded-xl flex flex-row gap-1 mb-2">
        <li className="px-3 py-.5 rounded text-white bg-[#2D6A4F]">List</li>
        <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Board</li>
        <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Roadmap</li>
      </ul>
      <FilterList statuses={statuses} users={users} />
      <IssuesList issues={issues} />
    </div>
    {selectedIssue && <DetailsPanel issue={selectedIssue} comments={comments} />}
  </div>


}