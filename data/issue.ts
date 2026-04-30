// lib/data/issues.ts
import {
  Cycle,
  Issue,
  IssueFilters,
  IssueWithRelations,
  Status,
  User,
} from '@/types';
import { getStatuses } from '@/data/statuses';
import { getUsers } from '@/data/users';
import { getCycles } from '@/data/cycle';

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
    assigneeIds: ['user-3'],
    projectId: 'project-2',
    cycleId: 'cycle-1',
    createdAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-18'),
  },
  {
    id: 'issue-4',
    title: 'Implement dark mode',
    description: 'Add dark mode support to the application',
    priority: 'low',
    statusId: 'status-3',
    assigneeIds: [],
    projectId: 'project-2',
    cycleId: null,
    createdAt: new Date('2024-01-13'),
    dueDate: null,
  },
  {
    id: 'issue-5',
    title: 'Database schema optimization',
    description: 'Optimize database schema for faster queries',
    priority: 'high',
    statusId: 'status-2',
    assigneeIds: ['user-1', 'user-2'],
    projectId: 'project-3',
    cycleId: 'cycle-2',
    createdAt: new Date('2024-01-14'),
    dueDate: new Date('2024-01-25'),
  },
  {
    id: 'issue-6',
    title: 'Set up CI/CD pipeline',
    description: 'Automate testing and deployment with GitHub Actions',
    priority: 'medium',
    statusId: 'status-1',
    assigneeIds: ['user-2'],
    projectId: 'project-3',
    cycleId: null,
    createdAt: new Date('2024-01-15'),
    dueDate: null,
  },
  {
    id: 'issue-7',
    title: 'User profile page',
    description: 'Create a user profile page with editable fields',
    priority: 'low',
    statusId: 'status-3',
    assigneeIds: ['user-3'],
    projectId: 'project-1',
    cycleId: 'cycle-2',
    createdAt: new Date('2024-01-16'),
    dueDate: new Date('2024-01-30'),
  },
  {
    id: 'issue-8',
    title: 'Implement search functionality',
    description:
      'Add search functionality to the application using Elasticsearch',
    priority: 'urgent',
    statusId: 'status-1',
    assigneeIds: ['user-1', 'user-3'],
    projectId: 'project-2',
    cycleId: null,
    createdAt: new Date('2024-01-17'),
    dueDate: new Date('2024-01-22'),
  },
  {
    id: 'issue-9',
    title: 'Refactor codebase',
    description:
      'Refactor codebase to improve maintainability and reduce technical debt',
    priority: 'medium',
    statusId: 'status-2',
    assigneeIds: ['user-2'],
    projectId: 'project-3',
    cycleId: 'cycle-1',
    createdAt: new Date('2024-01-18'),
    dueDate: new Date('2024-01-28'),
  },
  {
    id: 'issue-10',
    title: 'Add unit tests',
    description:
      'Increase test coverage by adding unit tests for critical components',
    priority: 'high',
    statusId: 'status-1',
    assigneeIds: ['user-1', 'user-2', 'user-3'],
    projectId: 'project-1',
    cycleId: null,
    createdAt: new Date('2024-01-19'),
    dueDate: new Date('2024-01-29'),
  },
];

function resolveIssueRelations(
  issue: Issue,
  statuses: Status[],
  users: User[],
  cycles: Cycle[],
): IssueWithRelations {
  const status = statuses.find((status) => status.id === issue.statusId);
  if (!status) {
    throw new Error(`Status not found for issue ${issue.id}`);
  }
  const assignees = users.filter((user) => issue.assigneeIds.includes(user.id));
  if (assignees.length !== issue.assigneeIds.length) {
    throw new Error(`Assignee not found for issue ${issue.id}`);
  }
  const cycleData = cycles.find((cycle) => cycle.id === issue.cycleId);
  return {
    ...issue,
    status,
    assignees: assignees,
    cycle: cycleData || null,
  };
}

export async function getIssues(): Promise<IssueWithRelations[]> {
  const [statuses, users, cycles] = await Promise.all([
    getStatuses(),
    getUsers(),
    getCycles(),
  ]);
  return issues.map((issue) =>
    resolveIssueRelations(issue, statuses, users, cycles),
  );
}

export async function getIssueById(
  issueId: string,
): Promise<IssueWithRelations | null> {
  const [statuses, users, cycles] = await Promise.all([
    getStatuses(),
    getUsers(),
    getCycles(),
  ]);
  const issue = issues.find((issue) => issue.id === issueId);
  if (!issue) return null;
  return resolveIssueRelations(issue, statuses, users, cycles);
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
): Promise<IssueWithRelations[]> {
  const [statuses, users, cycles] = await Promise.all([
    getStatuses(),
    getUsers(),
    getCycles(),
  ]);
  return issues
    .filter((issue) => {
      if (
        filters.priorities?.length &&
        !filters.priorities.includes(issue.priority)
      )
        return false;
      if (filters.cycleId && filters.cycleId !== issue.cycleId) return false;
      if (filters.projectId && filters.projectId !== issue.projectId)
        return false;
      if (
        filters.assigneeIds?.length &&
        !filters.assigneeIds.some((id) => issue.assigneeIds.includes(id))
      )
        return false;
      if (
        filters.statusIds?.length &&
        !filters.statusIds.includes(issue.statusId)
      )
        return false;
      return true;
    })
    .map((issue) => {
      return resolveIssueRelations(issue, statuses, users, cycles);
    });
}
