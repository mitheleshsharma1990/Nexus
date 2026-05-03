import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Project Alpha',
    description: 'This is the first project.',
    issues: [],
    createdAt: new Date('2026-04-01'),
    startDate: new Date('2026-04-10'),
    endDate: new Date('2026-06-30'),
    milestoneId: 'milestone-1',
  },
  {
    id: 'project-2',
    name: 'Project Beta',
    description: 'This is the second project.',
    issues: [],
    createdAt: new Date('2026-04-01'),
    startDate: new Date('2026-04-15'),
    endDate: new Date('2026-07-31'),
    milestoneId: 'milestone-2',
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectById(
  projectId: string,
): Promise<Project | null> {
  const project = projects.find((p) => p.id === projectId);
  return project || null;
}
