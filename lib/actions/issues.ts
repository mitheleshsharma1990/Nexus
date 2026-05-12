'use server';

import { Issue } from '@/types';
import { ServerActionResult } from '@/lib/actions/types';
import { revalidatePath } from 'next/cache';
import { issues } from '@/data/issue';
export type CreateIssueInput = Pick<
  Issue,
  | 'title'
  | 'description'
  | 'priority'
  | 'statusId'
  | 'assigneeIds'
  | 'projectId'
  | 'cycleId'
>;

export async function createIssue(
  input: CreateIssueInput,
): Promise<ServerActionResult<Issue>> {
  if (input.title.trim() === '' || !input.statusId || !input.projectId) {
    return { success: false, error: 'Missed required fields' };
  }
  const newIssue: Issue = {
    id: `issue-${crypto.randomUUID()}`,
    title: input.title.trim(),
    description: input.description ?? null,
    priority: input.priority,
    statusId: input.statusId || '',
    assigneeIds: input.assigneeIds ?? [],
    projectId: input.projectId,
    cycleId: input.cycleId ?? null,
    createdAt: new Date(),
    dueDate: null,
  };

  issues.push(newIssue);

  revalidatePath('/issues');

  return { success: true, data: newIssue };
}

export async function updateIssue(
  issue: Omit<Issue, 'projectId' | 'createdAt' | 'dueDate'>,
): Promise<ServerActionResult<Issue>> {
  if (issue.id.trim() === '' || issue.statusId.trim() === '') {
    return { success: false, error: 'Missed required fields' };
  }

  const issueFound = issues.find((iss) => iss.id === issue.id);
  if (!issueFound) {
    return { success: false, error: 'Issue not found' };
  }
  issueFound.statusId = issue.statusId;
  issueFound.title = issue.title;
  issueFound.description = issue.description;
  issueFound.statusId = issue.statusId;
  issueFound.assigneeIds = issue.assigneeIds;
  issueFound.cycleId = issue.cycleId;
  issueFound.priority = issue.priority;

  revalidatePath('/issues');
  return { success: true, data: issueFound };
}

export async function deleteIssue(
  issueId: string,
): Promise<ServerActionResult<null>> {
  if (issueId.trim() === '') {
    return { success: false, error: 'Missed required fields' };
  }

  const index = issues.findIndex((issue) => issue.id === issueId);
  if (index === -1) {
    return { success: false, error: 'Issue not found' };
  }
  issues.splice(index, 1);
  revalidatePath('/issues');
  return { success: true, data: null };
}
