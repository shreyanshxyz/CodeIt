import 'server-only';
import db from '../connection';
import { Achievement } from '@/types/database';

export type AchievementType = 
  | 'first_solve'
  | 'five_solves'
  | 'ten_solves'
  | 'twenty_five_solves'
  | 'fifty_solves'
  | 'hundred_solves'
  | 'all_easy'
  | 'all_medium'
  | 'all_hard'
  | 'first_attempt'
  | 'three_hard';

export class AchievementRepository {
  async findByUserId(userId: string): Promise<Achievement[]> {
    return db.query<Achievement>(
      'SELECT * FROM achievements WHERE user_id = $1 ORDER BY achieved_at DESC',
      [userId]
    );
  }

  async findByUserAndType(userId: string, type: AchievementType): Promise<Achievement | null> {
    return db.queryOne<Achievement>(
      'SELECT * FROM achievements WHERE user_id = $1 AND achievement_type = $2',
      [userId, type]
    );
  }

  async create(userId: string, type: AchievementType, metadata?: Record<string, unknown>): Promise<Achievement> {
    return db.queryOne<Achievement>(
      `INSERT INTO achievements (user_id, achievement_type, metadata)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, type, metadata ? JSON.stringify(metadata) : null]
    ) as Promise<Achievement>;
  }

  async exists(userId: string, type: AchievementType): Promise<boolean> {
    const result = await db.queryOne<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM achievements WHERE user_id = $1 AND achievement_type = $2) as exists',
      [userId, type]
    );
    return result?.exists ?? false;
  }

  async countByUser(userId: string): Promise<number> {
    const result = await db.queryOne<{ count: string }>(
      'SELECT COUNT(*)::text as count FROM achievements WHERE user_id = $1',
      [userId]
    );
    return result ? parseInt(result.count, 10) : 0;
  }

  async deleteByUser(userId: string): Promise<void> {
    await db.query('DELETE FROM achievements WHERE user_id = $1', [userId]);
  }
}
