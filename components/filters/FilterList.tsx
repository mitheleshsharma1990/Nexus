
"use client"

import { Status, User } from "@/types"
import { FilterChipProps } from "@/types/filters"
import FilterDropdown from "./FilterDropdown"
import FilterChip from "../ui/FilterChip"
import { useRouter, useSearchParams } from "next/navigation"
import { startTransition, useOptimistic } from "react"

type FilterBarProps = {
  statuses: Status[]
  users: User[]
}
const priorityDropdownOptions = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
  { id: 'urgent', label: 'Urgent' }
]

type FilterAction =
  | { type: 'ADD'; key: string; id: string }
  | { type: 'REMOVE'; key: string; id: string }
  | { type: 'CLEAR' }

export default function FilterList({ statuses, users }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedStatusIds = searchParams.getAll('statusId')
  const selectedAssigneeIds = searchParams.getAll('assigneeId')
  const selectedPriorityIds = searchParams.getAll('priority')

  const [optimisticFilters, setOptimisticFilters] = useOptimistic(
    {
      statusIds: selectedStatusIds,
      priorities: selectedPriorityIds,
      assigneeIds: selectedAssigneeIds
    },
    (state, action: FilterAction) => {
      if (action.type === 'CLEAR') {
        return { statusIds: [], priorities: [], assigneeIds: [] }
      }
      const keyMap: Record<string, 'statusIds' | 'priorities' | 'assigneeIds'> = {
        statusId: 'statusIds',
        priority: 'priorities',
        assigneeId: 'assigneeIds'
      }

      const stateKey = keyMap[action.key]
      if (!stateKey) return state

      if (action.type === 'ADD') {
        return state[stateKey].includes(action.id)
          ? state
          : { ...state, [stateKey]: [...state[stateKey], action.id] }
      }

      if (action.type === 'REMOVE') {
        return {
          ...state,
          [stateKey]: state[stateKey].filter(id => id !== action.id)
        }
      }

      return state
    }
  )

  const updateParam = (key: string, id: string) => {
    startTransition(() => {
      // Instantly apply UI changes
      setOptimisticFilters({ type: 'ADD', key, id })

      // Trigger actual URL navigation
      const params = new URLSearchParams(searchParams.toString())
      const existing = params.getAll(key)
      if (!existing.includes(id)) params.append(key, id)
      router.replace(`/issues?${params.toString()}`)
    })
  }

  const deleteParam = (key: string, id: string) => {
    startTransition(() => {
      // Instantly apply UI changes
      setOptimisticFilters({ type: 'REMOVE', key, id })

      // Trigger actual URL navigation
      const params = new URLSearchParams(searchParams.toString())
      const remaining = params.getAll(key).filter(pid => pid !== id)
      params.delete(key)
      remaining.forEach(v => params.append(key, v))
      router.replace(`/issues?${params.toString()}`)
    })
  }

  const activeChips: FilterChipProps[] = [
    ...optimisticFilters.statusIds.map(id => {
      return {
        label: statuses.find(s => s.id === id)?.name || 'Unknown',
        onDismiss: () => deleteParam('statusId', id)
      }
    }),
    ...optimisticFilters.assigneeIds.map(id => {
      return {
        label: users.find(u => u.id === id)?.name || 'Unknown',
        onDismiss: () => deleteParam('assigneeId', id)
      }
    }),
    ...optimisticFilters.priorities.map(id => {
      return {
        label: priorityDropdownOptions.find(p => p.id === id)?.label || 'Unknown',
        onDismiss: () => deleteParam('priority', id)
      }
    })
  ]

  const clearAll = () => {
    startTransition(() => {
      // Instantly apply UI changes
      setOptimisticFilters({ type: 'CLEAR' })

      // Trigger actual URL navigation
      const params = new URLSearchParams(searchParams.toString())
      params.delete('statusId')
      params.delete('priority')
      params.delete('assigneeId')
      router.replace(`/issues?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex flex-wrap items-center gap-2">
        {activeChips.length > 0 &&
          (activeChips.map((chip) => (
            <FilterChip key={chip.label} {...chip} />
          )))}
        {activeChips.length > 0 && (
          <button onClick={clearAll}
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors">
            Clear all
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <FilterDropdown label="Status"
          options={statuses.map(s => ({ id: s.id, label: s.name }))}
          selectedIds={optimisticFilters.statusIds}
          onSelect={(id) => updateParam('statusId', id)}
          onDeselect={(id) => deleteParam('statusId', id)} />

        <FilterDropdown label="Assignee"
          options={users.map(u => ({ id: u.id, label: u.name }))}
          selectedIds={optimisticFilters.assigneeIds}
          onSelect={(id) => updateParam('assigneeId', id)}
          onDeselect={(id) => deleteParam('assigneeId', id)} />

        <FilterDropdown label="Priority"
          options={priorityDropdownOptions}
          selectedIds={optimisticFilters.priorities}
          onSelect={(id) => updateParam('priority', id)}
          onDeselect={(id) => deleteParam('priority', id)} />
      </div>
    </div>
  )

}