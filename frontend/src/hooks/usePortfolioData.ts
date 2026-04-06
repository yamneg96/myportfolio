import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchExperience, fetchSkills, fetchAbout } from '@/services/api';

export function useProjects(params?: { page?: number; limit?: number; featured?: boolean }) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => fetchProjects(params),
    select: (res) => ({ data: res.data, pagination: res.pagination }),
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: fetchExperience,
    select: (res) => res.data,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
    select: (res) => res.data,
  });
}

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
    select: (res) => res.data,
  });
}
