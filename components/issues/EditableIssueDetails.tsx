"use client";

import { IssueWithRelations, Priority, Status, Issue } from "@/types";
import StatusChip from "../ui/StatusChip";
import PriorityChip from "../ui/PriorityChip";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import { priorityOptions } from "@/lib/utils/param"
import FilterDropdown from "@/components/filters/FilterDropdown"
import { updateIssue } from "@/lib/actions/issues"
export function EditableIssueDetails({ issue, cycleOptions = [], statusOptions = [], assigneeOptions = [] }:
  {
    issue: IssueWithRelations | null,
    cycleOptions: { id: string, name: string }[],
    statusOptions: { id: string, name: string }[],
    assigneeOptions: { id: string, name: string }[]
  }) {

  const [isEditMode, setIsEditMode] = useState(false);


  const [editIssue, setEditIssue] = useState({
    title: issue?.title || "",
    description: issue?.description || "",
    cycleId: issue?.cycle?.id || "",
    statusId: issue?.status.id || "",
    priority: issue?.priority || "low",
    assigneeIds: issue?.assignees.map((assignee) => assignee.id) || []
  });


  const addAssignee = (id: string) => {
    setEditIssue(state => ({
      ...state,
      assigneeIds: [...state.assigneeIds, id]
    }))
  }

  const removeAssignee = (id: string) => {
    setEditIssue(state => ({
      ...state,
      assigneeIds: state.assigneeIds.filter(assid => assid != id)
    }))
  }

  const updateIssueDetails = () => {

    const data: Omit<Issue, 'projectId' | 'createdAt' | 'dueDate'> = {
      id: issue?.id || "",
      title: editIssue.title,
      description: editIssue.description,
      priority: editIssue.priority,
      statusId: editIssue.statusId,
      assigneeIds: editIssue.assigneeIds,
      cycleId: editIssue.cycleId,
    }
    updateIssue(data)
    setIsEditMode(false)
  }

  let status = {} as Status
  let priority = "low" as Priority
  if (issue && issue.status) {
    status = issue.status
  }
  if (issue && issue.priority) {
    priority = issue.priority
  }


  return <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Issue Details</h1>
      <button
        className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-2 mr-10 rounded transition-colors duration-200"
        onClick={() => setIsEditMode(!isEditMode)}
      >
        {isEditMode ? 'Read Only' : 'Edit'}
      </button>
    </div>
    {
      !isEditMode ? <p className="text-lg font-semibold">{issue?.cycle?.name || 'No cycle assigned'}</p>
        : <Dropdown label="Cycle" name="cycle" options={cycleOptions} required={false}
          value={editIssue.cycleId || ""}
          onChange={(e) => setEditIssue(state => ({ ...state, cycleId: e.target.value }))} />
    }

    <hr className="my-4 border-t border-gray-300" />
    {
      !isEditMode ? <p className="text-gray-300 mb-2">{issue?.title}</p>
        : <input className="w-full border rounded-sm border-gray-300 py-1 px-2" type="text" value={editIssue?.title}
          onChange={(e) => setEditIssue(state => ({ ...state, title: e.target.value }))}
        />
    }

    {
      !isEditMode ? <p className="text-sm text-gray-400 mb-2">Status: <StatusChip status={status} /> </p>
        : <div className="my-4">
          <Dropdown label="Status" name="status" options={statusOptions} required={false}
            value={editIssue.statusId || ""}
            onChange={(e) => setEditIssue(state => ({ ...state, statusId: e.target.value }))}
          />
        </div>
    }
    {
      !isEditMode ? <p className="text-sm text-gray-400 mb-2">Assignee: {issue?.assignees?.map((assignee) => assignee.name).join(", ")}</p>
        : <FilterDropdown label="Assignee"
          name="assignee"
          options={assigneeOptions.map(ass => ({ id: ass.id, label: ass.name }))}
          selectedIds={editIssue.assigneeIds}
          onSelect={(id) => addAssignee(id)}
          onDeselect={(id) => removeAssignee(id)} />
    }

    {
      !isEditMode ? <p className="text-sm text-gray-400 mb-2">Priority: <PriorityChip priority={priority} /></p>
        : <div className="my-4">
          <Dropdown label="Priority" name="priority" options={priorityOptions} required={false}
            value={editIssue.priority}
            onChange={(e) => setEditIssue(state => ({ ...state, priority: e.target.value as Priority }))}
          />
        </div>
    }

    <hr className="my-4 border-t border-gray-300" />
    <p className="text-2xl font-bold mb-1">Description</p>
    {
      !isEditMode ? <p className="text-sm text-gray-400 mb-4">{issue?.description}</p>
        : <textarea className="w-full border rounded-sm border-gray-300 py-1 px-2"
          value={editIssue.description || ""}
          onChange={(e) => setEditIssue(state => ({ ...state, description: e.target.value }))}
        />
    }

    {
      isEditMode && <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-2 mr-10 rounded transition-colors duration-200"
        type="button" onClick={updateIssueDetails}>Save</button>
    }

  </>
}