import { z } from 'zod';

export const createSubmissionSchema = z.object({
  problem_id: z.string().min(1, 'Problem ID is required'),
  code: z.string().min(1, 'Code is required').max(50000, 'Code must be less than 50KB'),
  language: z.string().default('javascript'),
  test_results: z.object({
    passed: z.number().int().min(0),
    total: z.number().int().min(0),
    error: z.string().optional(),
  }),
});

export const submissionQuerySchema = z.object({
  problem_id: z.string().optional(),
  user_id: z.string().optional(),
  status: z.enum(['pending', 'accepted', 'rejected', 'error']).optional(),
  page: z.coerce.number().int().positive().max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
export type SubmissionQueryInput = z.infer<typeof submissionQuerySchema>;
