import api from '../lib/axios';
import type {
  ApiResponse,
  PaginatedResponse,
  Project,
  Experience,
  Skill,
  About,
} from '../types';

// ─── Auth ───────────────────────────────────────────────────
export const loginRequest = async (credentials: any) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
};

// ─── Projects ───────────────────────────────────────────────
export const fetchProjects = async (params?: {
  page?: number;
  limit?: number;
  featured?: boolean;
}): Promise<PaginatedResponse<Project>> => {
  const { data } = await api.get('/projects', { params });
  return data;
};

// ─── Experience ─────────────────────────────────────────────
export const fetchExperience = async (): Promise<ApiResponse<Experience[]>> => {
  const { data } = await api.get('/experience');
  return data;
};

// ─── Skills ─────────────────────────────────────────────────
export const fetchSkills = async (): Promise<ApiResponse<Skill[]>> => {
  const { data } = await api.get('/skills');
  return data;
};

// ─── About ──────────────────────────────────────────────────
export const fetchAbout = async (): Promise<ApiResponse<About>> => {
  const { data } = await api.get('/about');
  return data;
};
