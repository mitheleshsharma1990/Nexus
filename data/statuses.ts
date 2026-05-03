import { addDelay } from '@/lib/utils/param';
import { Status } from '@/types';

const statuses: Status[] = [
  {
    id: 'status-1',
    name: 'To Do',
    color: '#FF5733',
    teamId: 'team-1',
  },
  {
    id: 'status-2',
    name: 'In Progress',
    color: '#33C1FF',
    teamId: 'team-1',
  },
  {
    id: 'status-3',
    name: 'QA',
    color: '#FFC300',
    teamId: 'team-1',
  },
  {
    id: 'status-4',
    name: 'Done',
    color: '#28A745',
    teamId: 'team-1',
  },
];

export async function getStatuses(): Promise<Status[]> {
  return addDelay<Status[]>(Promise.resolve(statuses), 500); // Simulate network delay
}

export async function getStatusById(statusId: string): Promise<Status | null> {
  return addDelay<Status | null>(
    Promise.resolve(statuses.find((status) => status.id === statusId) ?? null),
    500,
  ); // Simulate network delay
}
