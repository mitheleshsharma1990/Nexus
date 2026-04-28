import { Cycle } from '@/types';

const cycles: Cycle[] = [
  {
    id: 'cycle-1',
    name: 'Sprint 1',
    description: 'First sprint of the project',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-01-15'),
    teamId: 'team-1',
    projectId: 'project-1',
  },
  {
    id: 'cycle-2',
    name: 'Sprint 2',
    description: 'Second sprint of the project',
    startDate: new Date('2026-01-16'),
    endDate: new Date('2026-01-31'),
    teamId: 'team-1',
    projectId: 'project-1',
  },
  {
    id: 'cycle-3',
    name: 'Sprint 3',
    description: 'First sprint of the project',
    startDate: new Date('2026-02-01'),
    endDate: new Date('2026-02-15'),
    teamId: 'team-2',
    projectId: 'project-1',
  },
  {
    id: 'cycle-4',
    name: 'Sprint 4',
    description: 'Second sprint of the project',
    startDate: new Date('2026-02-16'),
    endDate: new Date('2026-03-03'),
    teamId: 'team-2',
    projectId: 'project-1',
  },
  {
    id: 'cycle-5',
    name: 'Sprint 5',
    description: 'Third sprint of the project',
    startDate: new Date('2026-03-04'),
    endDate: new Date('2026-03-18'),
    teamId: 'team-1',
    projectId: 'project-1',
  },
];

export async function getCycles(): Promise<Cycle[]> {
  return cycles;
}
