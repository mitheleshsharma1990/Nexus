

import { Status } from "@/types/index"

export default function StatusChip({ status }: { status: Status }) {
  const baseClass = "px-3 py-1 rounded-full text-sm font-medium text-white"
  const statusColors: Record<string, string> = {
    'To Do': 'bg-gray-500',
    'In Progress': 'bg-blue-500',
    'QA': 'bg-yellow-500',
    'Done': 'bg-green-500',
    'Blocked': 'bg-red-500',
  };

  const colorClass = statusColors[status.name] || 'bg-gray-500';
  return <p className={`${baseClass} ${colorClass}`}>{status.name}</p>
}