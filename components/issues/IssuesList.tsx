

import { Issue } from "@/types"
import IssuesRow from "./IssuesRow"

export default async function IssuesList({ issues }: { issues: Issue[] }) {
  return <div className="flex flex-col gap-2">
    {issues.length > 0 ? issues.map(issue => <IssuesRow key={issue.id} issue={issue} />) : <p>No issues found.</p>}
  </div>
}