import { User } from '@/types';

let users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatarUrl: null,
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    avatarUrl: null,
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    avatarUrl: null,
  },
];

export async function getUsers(): Promise<User[]> {
  return users;
}

export async function getUserById(userId: string): Promise<User | null> {
  return users.find((user) => user.id === userId) ?? null;
}
