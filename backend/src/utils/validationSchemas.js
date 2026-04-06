const { z } = require('zod');

// ─── Auth Schemas ───────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// ─── Project Schemas ────────────────────────────────────────
const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(2000),
  techStack: z
    .array(z.string().min(1))
    .min(1, 'At least one technology is required')
    .or(z.string().transform((val) => val.split(',').map((s) => s.trim()).filter(Boolean))),
  liveLink: z.string().url().optional().or(z.literal('')),
  githubLink: z.string().url().optional().or(z.literal('')),
  featured: z
    .union([z.boolean(), z.string().transform((val) => val === 'true')])
    .optional()
    .default(false),
  order: z
    .union([z.number(), z.string().transform((val) => parseInt(val, 10))])
    .optional()
    .default(0),
});

const updateProjectSchema = createProjectSchema.partial();

// ─── Experience Schemas ─────────────────────────────────────
const createExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required').max(200),
  role: z.string().min(1, 'Role is required').max(200),
  description: z.string().min(1, 'Description is required').max(2000),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid start date'),
  endDate: z
    .string()
    .refine((val) => val === '' || !isNaN(Date.parse(val)), 'Invalid end date')
    .optional()
    .or(z.literal(''))
    .or(z.null()),
  order: z
    .union([z.number(), z.string().transform((val) => parseInt(val, 10))])
    .optional()
    .default(0),
});

const updateExperienceSchema = createExperienceSchema.partial();

// ─── Skill Schemas ──────────────────────────────────────────
const skillItemSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().min(0).max(100).optional().default(50),
  icon: z.string().optional().default(''),
});

const createSkillSchema = z.object({
  category: z.enum(['frontend', 'backend', 'mobile', 'ai', 'devops', 'tools', 'other']),
  items: z.array(skillItemSchema).min(1, 'At least one skill item is required'),
  order: z
    .union([z.number(), z.string().transform((val) => parseInt(val, 10))])
    .optional()
    .default(0),
});

const updateSkillSchema = createSkillSchema.partial();

// ─── About Schema ───────────────────────────────────────────
const updateAboutSchema = z.object({
  bio: z.string().min(1, 'Bio is required').max(5000),
  summary: z.string().min(1, 'Summary is required').max(1000),
  resumeUrl: z.string().url().optional().or(z.literal('')),
  socialLinks: z
    .object({
      github: z.string().optional().default(''),
      linkedin: z.string().optional().default(''),
      twitter: z.string().optional().default(''),
      website: z.string().optional().default(''),
    })
    .optional(),
});

module.exports = {
  loginSchema,
  createProjectSchema,
  updateProjectSchema,
  createExperienceSchema,
  updateExperienceSchema,
  skillItemSchema,
  createSkillSchema,
  updateSkillSchema,
  updateAboutSchema,
};
