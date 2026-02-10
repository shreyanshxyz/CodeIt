import { ProgressRepository } from '../db/repositories/progress.repository';
import { ProblemRepository } from '../db/repositories/problem.repository';
import { UserProgress } from '@/types/database';

export interface UserStats {
  total: number;
  solved: number;
  inProgress: number;
  notStarted: number;
  solvedByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export class ProgressService {
  private progressRepo = new ProgressRepository();
  private problemRepo = new ProblemRepository();

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return this.progressRepo.findByUserId(userId);
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const stats = await this.progressRepo.getUserStats(userId);

    const solvedProgress = await this.progressRepo.getRecentSolved(userId, 100);
    
    const solvedByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    for (const progress of solvedProgress) {
      const problem = await this.problemRepo.findById(progress.problem_id);
      if (problem) {
        if (problem.difficulty === 'Easy') solvedByDifficulty.easy++;
        else if (problem.difficulty === 'Medium') solvedByDifficulty.medium++;
        else if (problem.difficulty === 'Hard') solvedByDifficulty.hard++;
      }
    }

    return {
      ...stats,
      solvedByDifficulty,
    };
  }

  async getRecentSolved(userId: string, limit = 10): Promise<UserProgress[]> {
    return this.progressRepo.getRecentSolved(userId, limit);
  }
}
