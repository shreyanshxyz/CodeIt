import 'server-only';
import { ProblemRepository } from '../db/repositories/problem.repository';
import { ProgressRepository } from '../db/repositories/progress.repository';
import { Problem, CreateProblemDto } from '@/types/database';
import { NotFoundError } from '../utils/errors';

export interface ProblemWithProgress extends Problem {
  tags?: string[];
  userProgress?: {
    status: 'not_started' | 'in_progress' | 'solved';
    attempts_count: number;
  };
}

export interface PaginatedProblems {
  problems: ProblemWithProgress[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  difficulties: ('Easy' | 'Medium' | 'Hard')[];
  categories: string[];
  tags: string[];
}

export class ProblemService {
  private problemRepo = new ProblemRepository();
  private progressRepo = new ProgressRepository();

  async getAll(
    options: {
      difficulty?: 'Easy' | 'Medium' | 'Hard';
      category?: string;
      tag?: string;
      search?: string;
      sort?: 'order' | 'difficulty' | 'acceptance';
      sortOrder?: 'asc' | 'desc';
      page?: number;
      limit?: number;
      userId?: string;
    } = {}
  ): Promise<PaginatedProblems> {
    const {
      page = 1,
      limit = 20,
      difficulty,
      category,
      tag,
      search,
      sort,
      sortOrder,
      userId
    } = options;
    const offset = (page - 1) * limit;

    let problems: Problem[];
    let total: number;

    const hasSearchFilters = search || tag || difficulty || category;

    if (hasSearchFilters) {
      problems = await this.problemRepo.search({
        searchTerm: search,
        difficulty,
        category,
        tag,
        limit,
        offset,
      });

      total = await this.problemRepo.countSearch({
        searchTerm: search,
        difficulty,
        category,
        tag,
      });
    } else if (difficulty) {
      problems = await this.problemRepo.findByDifficulty(difficulty, limit, offset);
      total = await this.problemRepo.countByDifficulty(difficulty);
    } else if (category) {
      problems = await this.problemRepo.findByCategory(category, limit, offset);
      total = await this.problemRepo.count();
    } else {
      problems = await this.problemRepo.findAll(limit, offset);
      total = await this.problemRepo.count();
    }

    if (sort) {
      problems = this.sortProblems(problems, sort, sortOrder);
    }

    const problemsWithTags = await Promise.all(
      problems.map(async (problem) => {
        const tags = await this.problemRepo.getTags(problem.id);
        return { ...problem, tags };
      })
    );

    let problemsWithProgress: ProblemWithProgress[] = problemsWithTags;

    if (userId) {
      problemsWithProgress = await Promise.all(
        problemsWithTags.map(async (problem) => {
          const progress = await this.progressRepo.findByUserAndProblem(userId, problem.id);
          return {
            ...problem,
            userProgress: progress
              ? { status: progress.status, attempts_count: progress.attempts_count }
              : undefined,
          };
        })
      );
    }

    return {
      problems: problemsWithProgress,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private sortProblems(
    problems: Problem[],
    sort: 'order' | 'difficulty' | 'acceptance',
    order: 'asc' | 'desc' = 'asc'
  ): Problem[] {
    const sorted = [...problems];

    if (sort === 'difficulty') {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      sorted.sort((a, b) => {
        const aVal = difficultyOrder[a.difficulty];
        const bVal = difficultyOrder[b.difficulty];
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      });
    } else if (sort === 'acceptance') {
      sorted.sort((a, b) => {
        const aRate = a.acceptance_rate || 0;
        const bRate = b.acceptance_rate || 0;
        return order === 'asc' ? aRate - bRate : bRate - aRate;
      });
    } else if (sort === 'order') {
      sorted.sort((a, b) => {
        return order === 'asc' ? a.order_index - b.order_index : b.order_index - a.order_index;
      });
    }

    return sorted;
  }

  async getFilterOptions(): Promise<FilterOptions> {
    const [categories, tags] = await Promise.all([
      this.problemRepo.getUniqueCategories(),
      this.problemRepo.getUniqueTags(),
    ]);

    return {
      difficulties: ['Easy', 'Medium', 'Hard'],
      categories,
      tags,
    };
  }

  async getById(id: string, userId?: string): Promise<ProblemWithProgress> {
    const problem = await this.problemRepo.findById(id);
    if (!problem) {
      throw new NotFoundError('Problem');
    }

    const tags = await this.problemRepo.getTags(id);

    let userProgress;
    if (userId) {
      const progress = await this.progressRepo.findByUserAndProblem(userId, id);
      if (progress) {
        userProgress = {
          status: progress.status,
          attempts_count: progress.attempts_count,
        };
      }
    }

    return { ...problem, tags, userProgress };
  }

  async create(data: CreateProblemDto): Promise<Problem> {
    const existing = await this.problemRepo.findById(data.id);
    if (existing) {
      throw new Error('Problem with this ID already exists');
    }

    return this.problemRepo.create(data);
  }

  async update(id: string, data: Partial<Omit<CreateProblemDto, 'id' | 'tags'>>): Promise<Problem> {
    const problem = await this.problemRepo.update(id, data);
    if (!problem) {
      throw new NotFoundError('Problem');
    }
    return problem;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.problemRepo.delete(id);
    if (!deleted) {
      throw new NotFoundError('Problem');
    }
  }

  async getStats(): Promise<{
    total: number;
    byDifficulty: { easy: number; medium: number; hard: number };
  }> {
    const total = await this.problemRepo.count();
    const easy = await this.problemRepo.countByDifficulty('Easy');
    const medium = await this.problemRepo.countByDifficulty('Medium');
    const hard = await this.problemRepo.countByDifficulty('Hard');

    return {
      total,
      byDifficulty: { easy, medium, hard },
    };
  }
}
