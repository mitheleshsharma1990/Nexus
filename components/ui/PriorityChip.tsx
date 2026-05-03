


export default function PriorityChip({ priority }: { priority: string }) {
  const baseClass = "px-3 py-1 rounded-full text-sm font-medium text-white"
  const priorityColors: Record<string, string> = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    urgent: 'bg-red-500',
  };

  const colorClass = priorityColors[priority] || 'bg-gray-500';
  return <span className={`${baseClass} ${colorClass}`}>{priority}</span>
}