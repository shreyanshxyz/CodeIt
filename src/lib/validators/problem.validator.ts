import { z } from 'zod';

export const createProblemSchema = z.object({
  id: z.string().min(1, 'Problem ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  category: z.string().optional(),
  starter_code: z.string().min(1, 'Starter code is required'),
  starter_function_name: z.string().min(1, 'Starter function name is required'),
  handler_function: z.string().min(1, 'Handler function is required'),
  examples: z.array(z.object({
    id: z.number(),
    inputText: z.string(),
    outputText: z.string(),
    explanation: z.string().optional(),
    img: z.string().optional(),
  })).min(1, 'At least one example is required'),
  constraints: z.string().min(1, 'Constraints are required'),
  order_index: z.number().int().positive(),
  tags: z.array(z.string()).optional(),
});

export const updateProblemSchema = createProblemSchema.partial();

export const problemQuerySchema = z.object({
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateProblemInput = z.infer<typeof createProblemSchema>;
export type UpdateProblemInput = z.infer<typeof updateProblemSchema>;
export type ProblemQueryInput = z.infer<typeof problemQuerySchema>;
