import { Comment } from '@/types';

let comments: Comment[] = [
  {
    id: 'comment-1',
    description: 'This is a comment on the issue.',
    issueId: 'issue-1',
    authorId: 'user-1',
    createdAt: new Date(),
  },
  {
    id: 'comment-2',
    description: 'This is another comment on the issue.',
    issueId: 'issue-1',
    authorId: 'user-2',
    createdAt: new Date(),
  },
  {
    id: 'comment-3',
    description: 'This is a comment on another issue.',
    issueId: 'issue-2',
    authorId: 'user-1',
    createdAt: new Date(),
  },
];

export async function getCommentsByIssueId(
  issueId: string,
): Promise<Comment[]> {
  return comments.filter((comment) => comment.issueId === issueId);
}
