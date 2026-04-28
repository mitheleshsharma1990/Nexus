export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type IssueWithRelations = Issue & {
  status: Status;
  assignees: User[];
};

export type Issue = {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
  statusId: string;
  assigneeIds: string[];
  projectId: string;
  cycleId: string | null;
  createdAt: Date;
  dueDate: Date | null;
};

export type IssueAssignee = {
  issueId: string;
  userId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  issues: Issue[];
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  milestoneId: string;
};
export type Cycle = {
  id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  teamId: string;
  projectId: string;
};

export type CycleIssue = {
  issueId: string;
  cycleId: string;
  addedAt: Date;
};

export type Comment = {
  id: string;
  description: string;
  issueId: string;
  authorId: string;
  createdAt: Date;
};

export type ActivityLog = {
  id: string;
  issueId: string;
  userId: string;
  action: string; // e.g. "created issue", "updated status", "added comment"
  oldvalue?: string;
  newValue?: string;
  timestamp: Date;
};
export type Status = {
  id: string;
  name: string; // "To Do", "In Progress", "QA", "Done"
  color: String;
  teamId: string; // statuses are defined per team
};

export type StatusTransition = {
  fromStatusId: string;
  toStatusId: string;
};

export type IssueFilters = {
  projectId?: string;
  cycleId?: string;
  statusId?: string;
  assigneeId?: string;
  priority?: Priority;
};

export type Workspace = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  teams: Team[];
  users: User[];
};

export type Team = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  members: User[];
  projects: Project[];
};

export type Milestone = {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
};

// export * from './issue'
// export * from './user'
