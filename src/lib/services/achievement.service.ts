import 'server-only';
import { AchievementRepository, AchievementType } from '../db/repositories/achievement.repository';
import { ProgressRepository } from '../db/repositories/progress.repository';
import { ProblemRepository } from '../db/repositories/problem.repository';
import { Achievement } from '@/types/database';

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface AchievementDefinition {
  id: AchievementType;
  name: string;
  description: string;
  icon: string;
  iconColor?: string;
  rarity: AchievementRarity;
}

export interface AchievementWithDefinition extends Achievement {
  definition: AchievementDefinition;
}

export const ACHIEVEMENT_DEFINITIONS: Record<AchievementType, AchievementDefinition> = {
  first_solve: {
    id: 'first_solve',
    name: 'First Steps',
    description: 'Solve your first problem',
    icon: 'FaBullseye',
    rarity: 'common',
  },
  five_solves: {
    id: 'five_solves',
    name: 'Getting Started',
    description: 'Solve 5 problems',
    icon: 'FaRocket',
    rarity: 'common',
  },
  ten_solves: {
    id: 'ten_solves',
    name: 'On Fire',
    description: 'Solve 10 problems',
    icon: 'FaFire',
    rarity: 'uncommon',
  },
  twenty_five_solves: {
    id: 'twenty_five_solves',
    name: 'Problem Solver',
    description: 'Solve 25 problems',
    icon: 'FaStar',
    rarity: 'rare',
  },
  fifty_solves: {
    id: 'fifty_solves',
    name: 'Code Master',
    description: 'Solve 50 problems',
    icon: 'FaGem',
    rarity: 'epic',
  },
  hundred_solves: {
    id: 'hundred_solves',
    name: 'Legend',
    description: 'Solve 100 problems',
    icon: 'FaCrown',
    rarity: 'legendary',
  },
  all_easy: {
    id: 'all_easy',
    name: 'Easy Does It',
    description: 'Solve all Easy problems',
    icon: 'FaCheckCircle',
    iconColor: 'text-green-500',
    rarity: 'rare',
  },
  all_medium: {
    id: 'all_medium',
    name: 'Medium Well',
    description: 'Solve all Medium problems',
    icon: 'FaCheckCircle',
    iconColor: 'text-yellow-500',
    rarity: 'epic',
  },
  all_hard: {
    id: 'all_hard',
    name: 'Hard Core',
    description: 'Solve all Hard problems',
    icon: 'FaCheckCircle',
    iconColor: 'text-red-500',
    rarity: 'legendary',
  },
  first_attempt: {
    id: 'first_attempt',
    name: 'Perfectionist',
    description: 'Solve a problem on first try',
    icon: 'FaMagic',
    rarity: 'uncommon',
  },
  three_hard: {
    id: 'three_hard',
    name: 'Iron Will',
    description: 'Solve 3 Hard problems',
    icon: 'FaShieldAlt',
    rarity: 'rare',
  },
};

export const ALL_ACHIEVEMENTS = Object.values(ACHIEVEMENT_DEFINITIONS);

export class AchievementService {
  private achievementRepo = new AchievementRepository();
  private progressRepo = new ProgressRepository();
  private problemRepo = new ProblemRepository();

  async getUserAchievements(userId: string): Promise<AchievementWithDefinition[]> {
    const achievements = await this.achievementRepo.findByUserId(userId);
    
    return achievements.map(achievement => ({
      ...achievement,
      definition: ACHIEVEMENT_DEFINITIONS[achievement.achievement_type as AchievementType],
    }));
  }

  async getAllAchievementsWithStatus(userId: string): Promise<{
    earned: AchievementWithDefinition[];
    locked: AchievementDefinition[];
  }> {
    const userAchievements = await this.achievementRepo.findByUserId(userId);
    const earnedTypes = new Set(userAchievements.map(a => a.achievement_type));

    const earned: AchievementWithDefinition[] = userAchievements.map(achievement => ({
      ...achievement,
      definition: ACHIEVEMENT_DEFINITIONS[achievement.achievement_type as AchievementType],
    }));

    const locked: AchievementDefinition[] = ALL_ACHIEVEMENTS.filter(
      def => !earnedTypes.has(def.id)
    );

    return { earned, locked };
  }

  async checkAndAwardAchievements(userId: string): Promise<AchievementWithDefinition[]> {
    const newAchievements: AchievementWithDefinition[] = [];

    const stats = await this.getUserStats(userId);

    const solvedCount = stats.solved;

    if (solvedCount >= 1) {
      const achievement = await this.awardIfNotExists(userId, 'first_solve');
      if (achievement) newAchievements.push(achievement);
    }

    if (solvedCount >= 5) {
      const achievement = await this.awardIfNotExists(userId, 'five_solves');
      if (achievement) newAchievements.push(achievement);
    }

    if (solvedCount >= 10) {
      const achievement = await this.awardIfNotExists(userId, 'ten_solves');
      if (achievement) newAchievements.push(achievement);
    }

    if (solvedCount >= 25) {
      const achievement = await this.awardIfNotExists(userId, 'twenty_five_solves');
      if (achievement) newAchievements.push(achievement);
    }

    if (solvedCount >= 50) {
      const achievement = await this.awardIfNotExists(userId, 'fifty_solves');
      if (achievement) newAchievements.push(achievement);
    }

    if (solvedCount >= 100) {
      const achievement = await this.awardIfNotExists(userId, 'hundred_solves');
      if (achievement) newAchievements.push(achievement);
    }

    if (stats.hardCount >= 3) {
      const achievement = await this.awardIfNotExists(userId, 'three_hard');
      if (achievement) newAchievements.push(achievement);
    }

    if (stats.allEasySolved) {
      const achievement = await this.awardIfNotExists(userId, 'all_easy');
      if (achievement) newAchievements.push(achievement);
    }

    if (stats.allMediumSolved) {
      const achievement = await this.awardIfNotExists(userId, 'all_medium');
      if (achievement) newAchievements.push(achievement);
    }

    if (stats.allHardSolved) {
      const achievement = await this.awardIfNotExists(userId, 'all_hard');
      if (achievement) newAchievements.push(achievement);
    }

    return newAchievements;
  }

  async awardFirstAttemptAchievement(userId: string, problemId: string): Promise<AchievementWithDefinition | null> {
    const progress = await this.progressRepo.findByUserAndProblem(userId, problemId);
    
    if (progress && progress.attempts_count === 1 && progress.status === 'solved') {
      return this.awardIfNotExists(userId, 'first_attempt', { problem_id: problemId });
    }
    
    return null;
  }

  private async awardIfNotExists(
    userId: string,
    type: AchievementType,
    metadata?: Record<string, unknown>
  ): Promise<AchievementWithDefinition | null> {
    const exists = await this.achievementRepo.exists(userId, type);
    if (exists) return null;

    const achievement = await this.achievementRepo.create(userId, type, metadata);
    
    return {
      ...achievement,
      definition: ACHIEVEMENT_DEFINITIONS[type],
    };
  }

  private async getUserStats(userId: string): Promise<{
    solved: number;
    hardCount: number;
    allEasySolved: boolean;
    allMediumSolved: boolean;
    allHardSolved: boolean;
  }> {
    const solvedProgress = await this.progressRepo.getRecentSolved(userId, 1000);
    
    let hardCount = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    for (const progress of solvedProgress) {
      const problem = await this.problemRepo.findById(progress.problem_id);
      if (problem) {
        if (problem.difficulty === 'Easy') easySolved++;
        else if (problem.difficulty === 'Medium') mediumSolved++;
        else if (problem.difficulty === 'Hard') {
          hardSolved++;
          hardCount++;
        }
      }
    }

    const totalEasy = await this.problemRepo.countByDifficulty('Easy');
    const totalMedium = await this.problemRepo.countByDifficulty('Medium');
    const totalHard = await this.problemRepo.countByDifficulty('Hard');

    return {
      solved: solvedProgress.length,
      hardCount,
      allEasySolved: easySolved >= totalEasy && totalEasy > 0,
      allMediumSolved: mediumSolved >= totalMedium && totalMedium > 0,
      allHardSolved: hardSolved >= totalHard && totalHard > 0,
    };
  }
}
