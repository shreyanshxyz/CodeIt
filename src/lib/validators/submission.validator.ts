import { z } from 'zod';

export const createSubmissionSchema = z.object({
  problem_id: z.string().min(1, 'Problem ID is required'),
  code: z.string().min(1, 'Code is required'),
  language: z.string().default('javascript'),
});

export const submissionQuerySchema = z.object({
  problem_id: z.string().optional(),
  user_id: z.string().optional(),
  status: z.enum(['pending', 'accepted', 'rejected', 'error']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
export type SubmissionQueryInput = z.infer<typeof submissionQuerySchema>;
