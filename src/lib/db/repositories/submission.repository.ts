import 'server-only';
import db from '../connection';
import { Submission, CreateSubmissionDto } from '@/types/database';
import { v4 as uuidv4 } from 'uuid';

export class SubmissionRepository {
  async findById(id: string): Promise<Submission | null> {
    return db.queryOne<Submission>(
      'SELECT * FROM submissions WHERE id = $1',
      [id]
    );
  }

  async findByUserId(
    userId: string,
    limit = 50,
    offset = 0
  ): Promise<Submission[]> {
    return db.query<Submission>(
      'SELECT * FROM submissions WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );
  }

  async findByProblemId(
    problemId: string,
    limit = 50,
    offset = 0
  ): Promise<Submission[]> {
    return db.query<Submission>(
      'SELECT * FROM submissions WHERE problem_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [problemId, limit, offset]
    );
  }

  async findByUserAndProblem(
    userId: string,
    problemId: string,
    limit = 20
  ): Promise<Submission[]> {
    return db.query<Submission>(
      `SELECT * FROM submissions 
       WHERE user_id = $1 AND problem_id = $2 
       ORDER BY created_at DESC 
       LIMIT $3`,
      [userId, problemId, limit]
    );
  }

  async create(data: CreateSubmissionDto): Promise<Submission> {
    const id = uuidv4();
    return db.queryOne<Submission>(
      `INSERT INTO submissions (
        id, user_id, problem_id, code, language, status
      )
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *`,
      [id, data.user_id, data.problem_id, data.code, data.language]
    ) as Promise<Submission>;
  }

  async updateStatus(
    id: string,
    status: Submission['status'],
    metadata?: {
      execution_time_ms?: number;
      memory_used_mb?: number;
      test_cases_passed?: number;
      total_test_cases?: number;
      error_message?: string;
    }
  ): Promise<Submission | null> {
    const fields: string[] = ['status = $2'];
    const values: unknown[] = [id, status];
    let paramIndex = 3;

    if (metadata) {
      if (metadata.execution_time_ms !== undefined) {
        fields.push(`execution_time_ms = $${paramIndex++}`);
        values.push(metadata.execution_time_ms);
      }
      if (metadata.memory_used_mb !== undefined) {
        fields.push(`memory_used_mb = $${paramIndex++}`);
        values.push(metadata.memory_used_mb);
      }
      if (metadata.test_cases_passed !== undefined) {
        fields.push(`test_cases_passed = $${paramIndex++}`);
        values.push(metadata.test_cases_passed);
      }
      if (metadata.total_test_cases !== undefined) {
        fields.push(`total_test_cases = $${paramIndex++}`);
        values.push(metadata.total_test_cases);
      }
      if (metadata.error_message !== undefined) {
        fields.push(`error_message = $${paramIndex++}`);
        values.push(metadata.error_message);
      }
    }

    return db.queryOne<Submission>(
      `UPDATE submissions SET ${fields.join(', ')} WHERE id = $1 RETURNING *`,
      values
    );
  }

  async countByUser(userId: string): Promise<number> {
    const result = await db.query<{ count: string }>(
      'SELECT COUNT(*)::text as count FROM submissions WHERE user_id = $1',
      [userId]
    );
    return parseInt(result[0].count, 10);
  }

  async countByProblem(problemId: string): Promise<number> {
    const result = await db.query<{ count: string }>(
      'SELECT COUNT(*)::text as count FROM submissions WHERE problem_id = $1',
      [problemId]
    );
    return parseInt(result[0].count, 10);
  }

  async getRecentActivity(limit = 20): Promise<Submission[]> {
    return db.query<Submission>(
      `SELECT s.*, u.name as user_name, p.title as problem_title
       FROM submissions s
       JOIN users u ON s.user_id = u.id
       JOIN problems p ON s.problem_id = p.id
       ORDER BY s.created_at DESC
       LIMIT $1`,
      [limit]
    );
  }
}
