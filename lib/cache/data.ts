import { cache } from 'react';
import { getStatuses } from '@/data/statuses';
import { getUsers } from '@/data/users';
import { getCycles } from '@/data/cycle';
import { getProjects } from '@/data/projects';

// Wrap each data fetching function with cache()
export const getCachedStatuses = cache(getStatuses);
export const getCachedUsers = cache(getUsers);
export const getCachedCycles = cache(getCycles);
export const getCachedProjects = cache(getProjects);
