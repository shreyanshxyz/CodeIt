import 'server-only';
import { SubmissionRepository } from '../db/repositories/submission.repository';
import { ProblemRepository } from '../db/repositories/problem.repository';
import { ProgressRepository } from '../db/repositories/progress.repository';
import { Submission } from '@/types/database';
import { NotFoundError } from '../utils/errors';

export interface CreateSubmissionWithResultDto {
  problem_id: string;
  code: string;
  language?: string;
  test_results: {
    passed: number;
    total: number;
    error?: string;
  };
}

export interface SubmissionResult {
  id: string;
  status: 'accepted' | 'rejected' | 'error';
  test_cases_passed?: number;
  total_test_cases?: number;
  error_message?: string;
}

export class SubmissionService {
  private submissionRepo = new SubmissionRepository();
  private problemRepo = new ProblemRepository();
  private progressRepo = new ProgressRepository();

  async create(
    userId: string,
    data: CreateSubmissionWithResultDto
  ): Promise<SubmissionResult> {
    const problem = await this.problemRepo.findById(data.problem_id);
    if (!problem) {
      throw new NotFoundError('Problem');
    }

    const submission = await this.submissionRepo.create({
      user_id: userId,
      problem_id: data.problem_id,
      code: data.code,
      language: data.language || 'javascript',
    });

    const { passed, total, error } = data.test_results;
    const status = error
      ? 'error'
      : passed === total
      ? 'accepted'
      : 'rejected';

    const updatedSubmission = await this.submissionRepo.updateStatus(
      submission.id,
      status,
      {
        test_cases_passed: passed,
        total_test_cases: total,
        error_message: error,
      }
    );

    await this.problemRepo.incrementSubmissionCount(data.problem_id, status === 'accepted');

    await this.progressRepo.createOrUpdate(userId, data.problem_id, {
      status: status === 'accepted' ? 'solved' : 'in_progress',
    });

    return {
      id: submission.id,
      status,
      test_cases_passed: passed,
      total_test_cases: total,
      error_message: error,
    };
  }

  async getById(id: string, userId: string): Promise<Submission | null> {
    const submission = await this.submissionRepo.findById(id);
    if (submission && submission.user_id !== userId) {
      throw new NotFoundError('Submission');
    }
    return submission;
  }

  async getByUser(
    userId: string,
    options: { problemId?: string; limit?: number; offset?: number } = {}
  ): Promise<{ submissions: Submission[]; total: number }> {
    const { limit = 20, offset = 0, problemId } = options;

    let submissions: Submission[];
    if (problemId) {
      submissions = await this.submissionRepo.findByUserAndProblem(
        userId,
        problemId,
        limit
      );
    } else {
      submissions = await this.submissionRepo.findByUserId(userId, limit, offset);
    }

    const total = await this.submissionRepo.countByUser(userId);

    return { submissions, total };
  }

  async getRecentActivity(limit = 20): Promise<Submission[]> {
    return this.submissionRepo.getRecentActivity(limit);
  }
}
