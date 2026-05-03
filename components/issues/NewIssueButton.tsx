
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
// import NewIssueForm from "./NewIssueForm";

const NewIssueModal = dynamic(() => import("./NewIssueForm"))

export default function NewIssueButton({ statuses, users, projectIds, cycleIds }: {
  statuses: { id: string, name: string }[],
  users: { id: string, name: string }[],
  projectIds: { id: string, name: string }[],
  cycleIds?: { id: string, name: string }[]
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        + New Issue
      </button>
      {isOpen && <NewIssueModal
        statuses={statuses}
        users={users} projectIds={projectIds}
        cycleIds={cycleIds}
        onClose={() => setIsOpen(false)} />}
    </div>
  )
}