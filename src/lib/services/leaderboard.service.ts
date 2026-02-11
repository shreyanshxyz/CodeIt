import 'server-only';
import { LeaderboardRepository } from '../db/repositories/leaderboard.repository';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar_url: string | null;
  solvedCount: number;
  totalSubmissions: number;
  successRate: number;
}

export class LeaderboardService {
  private repo = new LeaderboardRepository();

  async getGlobal(page = 1, limit = 20): Promise<{
    entries: LeaderboardEntry[];
    total: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    const [rows, total] = await Promise.all([
      this.repo.getGlobal(limit, offset),
      this.repo.getTotalCount(),
    ]);

    const entries = rows.map((row, index) => ({
      rank: offset + index + 1,
      userId: row.user_id,
      name: row.name,
      avatar_url: row.avatar_url,
      solvedCount: row.solved_count,
      totalSubmissions: row.total_submissions || 0,
      successRate: row.total_submissions > 0
        ? (row.solved_count / row.total_submissions) * 100
        : 0,
    }));

    return {
      entries,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAroundUser(userId: string, around = 5): Promise<{
    entries: LeaderboardEntry[];
    userRank: number | null;
  }> {
    const [rows, userRank] = await Promise.all([
      this.repo.getAroundUser(userId, around),
      this.repo.getUserRank(userId),
    ]);

    const entries = rows.map((row) => ({
      rank: 0,
      userId: row.user_id,
      name: row.name,
      avatar_url: row.avatar_url,
      solvedCount: row.solved_count,
      totalSubmissions: row.total_submissions || 0,
      successRate: row.total_submissions > 0
        ? (row.solved_count / row.total_submissions) * 100
        : 0,
    }));

    return { entries, userRank };
  }
}
