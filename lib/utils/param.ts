import { PRIORITIES, Priority } from '@/types';

export function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

export function isPriority(value: any): value is Priority {
  return PRIORITIES.includes(value);
}

export function addDelay<T>(promise: Promise<T>, delay: number): Promise<T> {
  return new Promise((resolve, reject) => {
    promise
      .then((result) => {
        setTimeout(() => resolve(result), delay);
      })
      .catch((error) => {
        setTimeout(() => reject(error), delay);
      });
  });
}
