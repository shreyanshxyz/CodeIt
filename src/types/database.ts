export interface User {
  id: string;
  email: string;
  password_hash: string | null;
  name: string;
  avatar_url: string | null;
  github_username: string | null;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export type UserPublic = Omit<User, 'password_hash'>;

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string | null;
  acceptance_rate: number | null;
  total_submissions: number;
  successful_submissions: number;
  starter_code: string;
  starter_function_name: string;
  handler_function: string;
  examples: Example[];
  constraints: string;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface Example {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
}

export interface ProblemTag {
  id: number;
  problem_id: string;
  tag: string;
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  status: 'pending' | 'accepted' | 'rejected' | 'error';
  execution_time_ms: number | null;
  memory_used_mb: number | null;
  test_cases_passed: number | null;
  total_test_cases: number | null;
  error_message: string | null;
  created_at: Date;
}

export interface UserProgress {
  id: string;
  user_id: string;
  problem_id: string;
  status: 'not_started' | 'in_progress' | 'solved';
  attempts_count: number;
  last_attempted_at: Date | null;
  solved_at: Date | null;
}

export interface Achievement {
  id: number;
  user_id: string;
  achievement_type: string;
  achieved_at: Date;
  metadata: Record<string, unknown> | null;
}

export interface CreateUserDto {
  email: string;
  password_hash?: string;
  name: string;
  avatar_url?: string;
  github_username?: string;
}

export interface UpdateUserDto {
  name?: string;
  avatar_url?: string;
  github_username?: string;
}

export interface CreateProblemDto {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category?: string;
  starter_code: string;
  starter_function_name: string;
  handler_function: string;
  examples: Example[];
  constraints: string;
  order_index: number;
  tags?: string[];
}

export interface CreateSubmissionDto {
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
}

export interface UpdateProgressDto {
  status: 'not_started' | 'in_progress' | 'solved';
  attempts_count?: number;
}
