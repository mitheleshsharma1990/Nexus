// lib/data/issues.ts
import { Issue } from '@/types';
import { IssueFilters } from '@/types';
const issues: Issue[] = [
  {
    id: 'issue-1',
    title: 'Set up authentication service',
    description: 'Implement OAuth2 flow with refresh tokens',
    priority: 'high',
    statusId: 'status-2',
    assigneeIds: ['user-1'],
    projectId: 'project-1',
    cycleId: 'cycle-1',
    createdAt: new Date('2024-01-10'),
    dueDate: new Date('2024-01-20'),
  },
  {
    id: 'issue-2',
    title: 'Design token system',
    description: 'Create a consistent design token system using CSS variables',
    priority: 'medium',
    statusId: 'status-1',
    assigneeIds: ['user-2', 'user-3'],
    projectId: 'project-1',
    cycleId: null,
    createdAt: new Date('2024-01-11'),
    dueDate: null,
  },
  {
    id: 'issue-3',
    title: 'API rate limiting',
    description: null,
    priority: 'urgent',
    statusId: 'status-1',
    assigneeIds: [],
    projectId: 'project-2',
    cycleId: 'cycle-1',
    createdAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-18'),
  },
];

export async function getIssues(): Promise<Issue[]> {
  return issues;
}

export async function getIssueById(issueId: string): Promise<Issue | null> {
  return issues.find((issue) => issue.id === issueId) ?? null;
}

export async function getIssuesByProject(projectId: string): Promise<Issue[]> {
  return issues.filter((issue) => issue.projectId === projectId);
}

export async function getIssuesByCycle(cycleId: string): Promise<Issue[]> {
  return issues.filter((issue) => issue.cycleId === cycleId);
}

export async function getIssuesByAssignee(
  assigneeId: string,
): Promise<Issue[]> {
  return issues.filter((issue) => issue.assigneeIds.includes(assigneeId));
}

export async function getFilteredIssues(
  filters: IssueFilters,
): Promise<Issue[]> {
  return issues.filter((issue) => {
    if (filters.priority && filters.priority !== issue.priority) return false;
    if (filters.cycleId && filters.cycleId !== issue.cycleId) return false;
    if (filters.projectId && filters.projectId !== issue.projectId)
      return false;
    if (filters.assigneeId && !issue.assigneeIds.includes(filters.assigneeId))
      return false;
    if (filters.statusId && filters.statusId !== issue.statusId) return false;
    return true;
  });
}
