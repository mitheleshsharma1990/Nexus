

import IssuesList from "@/components/issues/IssuesList";
import { getIssues } from "@/data/issue";


export default async function IssuesPage() {
  const issues = await getIssues();

  return <div className="flex flex-col gap-4">
    <h1 className="text-2xl font-bold">Issues</h1>
    <IssuesList issues={issues} />
  </div>
}