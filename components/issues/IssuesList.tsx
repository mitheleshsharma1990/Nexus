

import { IssueWithRelations, Priority } from "@/types"
import IssuesRow from "./IssuesRow"
import { getFilteredIssues } from "@/data/issue";

type IssuesListProps = {
  statusIds?: string[]
  priorities?: string[]
  assigneeIds?: string[]
}


export default async function IssuesList({ statusIds, priorities, assigneeIds }: IssuesListProps) {
  const issues: IssueWithRelations[] = await getFilteredIssues({
    statusIds: statusIds || [],
    priorities: priorities as Priority[] || [],
    assigneeIds: assigneeIds || [],
  })
  return <div className="flex flex-col gap-2 h-full overflow-y-auto">
    {issues.length > 0 ? issues.map(issue => <IssuesRow key={issue.id} issue={issue} />)
      : <p>No issues found.</p>}
  </div>
}