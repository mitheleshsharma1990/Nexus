

import FilterList from "./FilterList"
import { getCachedStatuses, getCachedUsers } from "@/lib/cache/data";
import { Suspense } from "react";

export async function FilterBar() {
  const [statuses, users] = await Promise.all([
    getCachedStatuses(),
    getCachedUsers(),
  ])

  return <Suspense fallback={<div>Loading filters...</div>}>
    <FilterList statuses={statuses} users={users} />
  </Suspense>
}