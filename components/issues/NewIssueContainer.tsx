

import NewIssueButton from "./NewIssueButton";
import { getCachedStatuses, getCachedUsers, getCachedCycles, getCachedProjects } from "@/lib/cache/data";
export default async function NewIssueContainer() {
  const [statuses, users, cycles, projects] = await Promise.all([
    getCachedStatuses(),
    getCachedUsers(),
    getCachedCycles(),
    getCachedProjects()
  ])
  const statusOptions = statuses.map(s => ({ id: s.id, name: s.name }))
  const projectOptions = projects.map(p => ({ id: p.id, name: p.name }))
  const cycleOptions = cycles.map(c => ({ id: c.id, name: c.name }))
  const userOptions = users.map(u => ({ id: u.id, name: u.name }))

  return <NewIssueButton
    statuses={statusOptions}
    users={userOptions}
    projectIds={projectOptions}
    cycleIds={cycleOptions} />
}