

import FilterList from "./FilterList"
import { getCachedStatuses, getCachedUsers } from "@/lib/cache/data";

export async function FilterBar() {
  const [statuses, users] = await Promise.all([
    getCachedStatuses(),
    getCachedUsers(),
  ])

  return <FilterList statuses={statuses} users={users} />
}