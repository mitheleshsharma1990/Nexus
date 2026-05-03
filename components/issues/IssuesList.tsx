

import { IssueWithRelations } from "@/types"
import IssuesRow from "./IssuesRow"

export default async function IssuesList({ issues }: { issues: IssueWithRelations[] }) {
  return <div className="flex flex-col gap-2 h-full overflow-y-auto">
    {issues.length > 0 ? issues.map(issue => <IssuesRow key={issue.id} issue={issue} />)
      : <p>No issues found.</p>}
  </div>
}