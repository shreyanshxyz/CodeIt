import 'server-only';
import db from '../connection';

interface LeaderboardRow {
  user_id: string;
  name: string;
  avatar_url: string | null;
  solved_count: number;
  total_submissions: number;
}

export class LeaderboardRepository {
  async getGlobal(limit = 100, offset = 0): Promise<LeaderboardRow[]> {
    return db.query<LeaderboardRow>(
      `SELECT 
        u.id as user_id,
        u.name,
        u.avatar_url,
        COUNT(*) FILTER (WHERE up.status = 'solved') as solved_count,
        COUNT(s.id) as total_submissions
       FROM users u
       LEFT JOIN user_progress up ON u.id = up.user_id
       LEFT JOIN submissions s ON u.id = s.user_id
       GROUP BY u.id
       ORDER BY solved_count DESC, u.created_at ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  }

  async getAroundUser(userId: string, around: number = 5): Promise<LeaderboardRow[]> {
    return db.query<LeaderboardRow>(
      `WITH ranked AS (
        SELECT 
          u.id as user_id,
          u.name,
          u.avatar_url,
          COUNT(*) FILTER (WHERE up.status = 'solved') as solved_count,
          COUNT(s.id) as total_submissions,
          RANK() OVER (ORDER BY COUNT(*) FILTER (WHERE up.status = 'solved') DESC) as rank
        FROM users u
        LEFT JOIN user_progress up ON u.id = up.user_id
        LEFT JOIN submissions s ON u.id = s.user_id
        GROUP BY u.id
      )
      SELECT user_id, name, avatar_url, solved_count, total_submissions
      FROM ranked
      WHERE ABS(rank - (SELECT rank FROM ranked WHERE user_id = $1)) <= $2
      ORDER BY solved_count DESC`,
      [userId, around]
    );
  }

  async getUserRank(userId: string): Promise<number | null> {
    const result = await db.queryOne<{ rank: string }>(
      `WITH ranked AS (
        SELECT 
          u.id,
          RANK() OVER (ORDER BY COUNT(*) FILTER (WHERE up.status = 'solved') DESC) as rank
        FROM users u
        LEFT JOIN user_progress up ON u.id = up.user_id
        GROUP BY u.id
      )
      SELECT rank::text FROM ranked WHERE id = $1`,
      [userId]
    );
    return result ? parseInt(result.rank, 10) : null;
  }

  async getTotalCount(): Promise<number> {
    const result = await db.queryOne<{ count: string }>(
      `SELECT COUNT(DISTINCT u.id)::text as count
       FROM users u
       INNER JOIN user_progress up ON u.id = up.user_id
       WHERE up.status = 'solved'`
    );
    return result ? parseInt(result.count, 10) : 0;
  }
}
