// ─── API Response Wrapper ───────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ─── Project ────────────────────────────────────────────────
export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  image: {
    url: string;
    publicId: string;
  };
  liveLink: string;
  githubLink: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Experience ─────────────────────────────────────────────
export interface Experience {
  _id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Skill ──────────────────────────────────────────────────
export interface SkillItem {
  _id: string;
  name: string;
  level: number;
  icon: string;
}

export interface Skill {
  _id: string;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops' | 'tools' | 'other';
  items: SkillItem[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── About ──────────────────────────────────────────────────
export interface About {
  _id?: string;
  title: string;
  bio: string;
  summary: string;
  email: string;
  location: string;
  avatar: {
    url: string;
    publicId: string;
  };
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
}
