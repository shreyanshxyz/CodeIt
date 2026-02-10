import { SubmissionRepository } from '../db/repositories/submission.repository';
import { ProblemRepository } from '../db/repositories/problem.repository';
import { ProgressRepository } from '../db/repositories/progress.repository';
import { Submission, CreateSubmissionDto } from '@/types/database';
import { NotFoundError, ValidationError } from '../utils/errors';
import db from '../db/connection';

export interface SubmissionResult {
  id: string;
  status: 'accepted' | 'rejected' | 'error';
  execution_time_ms?: number;
  memory_used_mb?: number;
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
    data: Omit<CreateSubmissionDto, 'user_id'>
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

    const startTime = Date.now();
    try {
      const result = await this.executeCode(problem.handler_function, data.code);
      const executionTime = Date.now() - startTime;

      const status = result.success ? 'accepted' : 'rejected';

      const updatedSubmission = await this.submissionRepo.updateStatus(
        submission.id,
        status,
        {
          execution_time_ms: executionTime,
          test_cases_passed: result.passed,
          total_test_cases: result.total,
          error_message: result.error,
        }
      );

      await this.problemRepo.incrementSubmissionCount(data.problem_id, status === 'accepted');

      await this.progressRepo.createOrUpdate(userId, data.problem_id, {
        status: status === 'accepted' ? 'solved' : 'in_progress',
      });

      return {
        id: submission.id,
        status,
        execution_time_ms: executionTime,
        test_cases_passed: result.passed,
        total_test_cases: result.total,
        error_message: result.error,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      await this.submissionRepo.updateStatus(submission.id, 'error', {
        execution_time_ms: executionTime,
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });

      await this.progressRepo.createOrUpdate(userId, data.problem_id, {
        status: 'in_progress',
      });

      return {
        id: submission.id,
        status: 'error',
        execution_time_ms: executionTime,
        error_message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async executeCode(
    handlerFunction: string,
    userCode: string
  ): Promise<{ success: boolean; passed: number; total: number; error?: string }> {
    try {
      const codeToExtract = userCode.slice(userCode.indexOf('function'));
      const userFunction = new Function(`return ${codeToExtract}`)();

      const handlerCode = handlerFunction;
      const testHandler = eval(`(${handlerCode})`);

      const result = testHandler(userFunction);

      return {
        success: true,
        passed: 1,
        total: 1,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('Test case')) {
        return {
          success: false,
          passed: 0,
          total: 1,
          error: errorMessage,
        };
      }

      return {
        success: false,
        passed: 0,
        total: 1,
        error: errorMessage,
      };
    }
  }

  async getById(id: string): Promise<Submission | null> {
    return this.submissionRepo.findById(id);
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
