import { PRIORITIES, Priority } from '@/types';

export function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

export function isPriority(value: any): value is Priority {
  return PRIORITIES.includes(value);
}
