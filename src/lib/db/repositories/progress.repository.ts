import 'server-only';
import db from '../connection';
import { UserProgress, UpdateProgressDto } from '@/types/database';
import { v4 as uuidv4 } from 'uuid';

export class ProgressRepository {
  async findByUserId(userId: string): Promise<UserProgress[]> {
    return db.query<UserProgress>(
      'SELECT * FROM user_progress WHERE user_id = $1',
      [userId]
    );
  }

  async findByUserAndProblem(
    userId: string,
    problemId: string
  ): Promise<UserProgress | null> {
    return db.queryOne<UserProgress>(
      'SELECT * FROM user_progress WHERE user_id = $1 AND problem_id = $2',
      [userId, problemId]
    );
  }

  async createOrUpdate(
    userId: string,
    problemId: string,
    data: UpdateProgressDto
  ): Promise<UserProgress> {
    const existing = await this.findByUserAndProblem(userId, problemId);
    
    if (existing) {
      const fields: string[] = ['status = $3', 'updated_at = NOW()'];
      const values: unknown[] = [userId, problemId, data.status];
      let paramIndex = 4;

      if (data.attempts_count !== undefined) {
        fields.push(`attempts_count = $${paramIndex++}`);
        values.push(data.attempts_count);
      } else {
        fields.push(`attempts_count = attempts_count + 1`);
      }

      fields.push('last_attempted_at = NOW()');

      if (data.status === 'solved') {
        fields.push('solved_at = NOW()');
      }

      return db.queryOne<UserProgress>(
        `UPDATE user_progress 
         SET ${fields.join(', ')} 
         WHERE user_id = $1 AND problem_id = $2 
         RETURNING *`,
        values
      ) as Promise<UserProgress>;
    } else {
      const id = uuidv4();
      return db.queryOne<UserProgress>(
        `INSERT INTO user_progress (
          id, user_id, problem_id, status, attempts_count, 
          last_attempted_at, solved_at
        )
        VALUES ($1, $2, $3, $4, $5, NOW(), $6)
        RETURNING *`,
        [
          id,
          userId,
          problemId,
          data.status,
          data.attempts_count || 1,
          data.status === 'solved' ? new Date() : null,
        ]
      ) as Promise<UserProgress>;
    }
  }

  async getUserStats(userId: string): Promise<{
    total: number;
    solved: number;
    inProgress: number;
    notStarted: number;
  }> {
    const result = await db.queryOne<{
      total: string;
      solved: string;
      in_progress: string;
      not_started: string;
    }>(
      `SELECT 
        COUNT(*)::text as total,
        COUNT(*) FILTER (WHERE status = 'solved')::text as solved,
        COUNT(*) FILTER (WHERE status = 'in_progress')::text as in_progress,
        COUNT(*) FILTER (WHERE status = 'not_started')::text as not_started
       FROM user_progress 
       WHERE user_id = $1`,
      [userId]
    );

    return {
      total: parseInt(result?.total || '0', 10),
      solved: parseInt(result?.solved || '0', 10),
      inProgress: parseInt(result?.in_progress || '0', 10),
      notStarted: parseInt(result?.not_started || '0', 10),
    };
  }

  async getRecentSolved(userId: string, limit = 10): Promise<UserProgress[]> {
    return db.query<UserProgress>(
      `SELECT * FROM user_progress 
       WHERE user_id = $1 AND status = 'solved' 
       ORDER BY solved_at DESC 
       LIMIT $2`,
      [userId, limit]
    );
  }

  async deleteByUser(userId: string): Promise<void> {
    await db.query(
      'DELETE FROM user_progress WHERE user_id = $1',
      [userId]
    );
  }
}
