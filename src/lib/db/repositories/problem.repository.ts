import 'server-only';
import db from '../connection';
import { Problem, ProblemTag, CreateProblemDto } from '@/types/database';

export class ProblemRepository {
  async findAll(limit = 100, offset = 0): Promise<Problem[]> {
    return db.query<Problem>(
      'SELECT * FROM problems ORDER BY order_index ASC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
  }

  async findById(id: string): Promise<Problem | null> {
    return db.queryOne<Problem>(
      'SELECT * FROM problems WHERE id = $1',
      [id]
    );
  }

  async findByDifficulty(
    difficulty: 'Easy' | 'Medium' | 'Hard',
    limit = 100,
    offset = 0
  ): Promise<Problem[]> {
    return db.query<Problem>(
      'SELECT * FROM problems WHERE difficulty = $1 ORDER BY order_index ASC LIMIT $2 OFFSET $3',
      [difficulty, limit, offset]
    );
  }

  async findByCategory(
    category: string,
    limit = 100,
    offset = 0
  ): Promise<Problem[]> {
    return db.query<Problem>(
      'SELECT * FROM problems WHERE category = $1 ORDER BY order_index ASC LIMIT $2 OFFSET $3',
      [category, limit, offset]
    );
  }

  async search(options: {
    searchTerm?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    category?: string;
    tag?: string;
    limit?: number;
    offset?: number;
  }): Promise<Problem[]> {
    const { searchTerm, difficulty, category, tag, limit = 100, offset = 0 } = options;

    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (searchTerm) {
      conditions.push(`title ILIKE $${paramIndex++}`);
      values.push(`%${searchTerm}%`);
    }

    if (difficulty) {
      conditions.push(`difficulty = $${paramIndex++}`);
      values.push(difficulty);
    }

    if (category) {
      conditions.push(`category = $${paramIndex++}`);
      values.push(category);
    }

    if (tag) {
      conditions.push(`EXISTS (
        SELECT 1 FROM problem_tags pt 
        WHERE pt.problem_id = p.id AND pt.tag = $${paramIndex++}
      )`);
      values.push(tag);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT p.* FROM problems p
      ${whereClause}
      ORDER BY p.order_index ASC
      LIMIT $${paramIndex++} OFFSET $${paramIndex}
    `;

    values.push(limit, offset);

    return db.query<Problem>(query, values);
  }

  async countSearch(options: {
    searchTerm?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    category?: string;
    tag?: string;
  }): Promise<number> {
    const { searchTerm, difficulty, category, tag } = options;

    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (searchTerm) {
      conditions.push(`title ILIKE $${paramIndex++}`);
      values.push(`%${searchTerm}%`);
    }

    if (difficulty) {
      conditions.push(`difficulty = $${paramIndex++}`);
      values.push(difficulty);
    }

    if (category) {
      conditions.push(`category = $${paramIndex++}`);
      values.push(category);
    }

    if (tag) {
      conditions.push(`EXISTS (
        SELECT 1 FROM problem_tags pt 
        WHERE pt.problem_id = p.id AND pt.tag = $${paramIndex++}
      )`);
      values.push(tag);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT COUNT(*)::text as count FROM problems p
      ${whereClause}
    `;

    const result = await db.queryOne<{ count: string }>(query, values);
    return result ? parseInt(result.count, 10) : 0;
  }

  async getUniqueCategories(): Promise<string[]> {
    const result = await db.query<{ category: string }>(
      `SELECT DISTINCT category FROM problems WHERE category IS NOT NULL ORDER BY category`
    );
    return result.map(r => r.category);
  }

  async getUniqueTags(): Promise<string[]> {
    const result = await db.query<{ tag: string }>(
      `SELECT DISTINCT tag FROM problem_tags ORDER BY tag`
    );
    return result.map(r => r.tag);
  }

  async create(data: CreateProblemDto): Promise<Problem> {
    const result = await db.queryOne<Problem>(
      `INSERT INTO problems (
        id, title, description, difficulty, category, starter_code, 
        starter_function_name, handler_function, examples, constraints, order_index
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        data.id,
        data.title,
        data.description,
        data.difficulty,
        data.category || null,
        data.starter_code,
        data.starter_function_name,
        data.handler_function,
        JSON.stringify(data.examples),
        data.constraints,
        data.order_index,
      ]
    );

    if (data.tags && data.tags.length > 0) {
      await this.addTags(data.id, data.tags);
    }

    return result as Problem;
  }

  async addTags(problemId: string, tags: string[]): Promise<void> {
    for (const tag of tags) {
      await db.query(
        'INSERT INTO problem_tags (problem_id, tag) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [problemId, tag]
      );
    }
  }

  async getTags(problemId: string): Promise<string[]> {
    const result = await db.query<ProblemTag>(
      'SELECT tag FROM problem_tags WHERE problem_id = $1',
      [problemId]
    );
    return result.map((row) => row.tag);
  }

  async update(
    id: string,
    data: Partial<Omit<CreateProblemDto, 'id' | 'tags'>>
  ): Promise<Problem | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    const allowedFields: (keyof Omit<CreateProblemDto, 'id' | 'tags'>)[] = [
      'title', 'description', 'difficulty', 'category', 'starter_code',
      'starter_function_name', 'handler_function', 'examples', 'constraints', 'order_index'
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        if (field === 'examples') {
          fields.push(`${field} = $${paramIndex++}`);
          values.push(JSON.stringify(data[field]));
        } else {
          fields.push(`${field} = $${paramIndex++}`);
          values.push(data[field]);
        }
      }
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push('updated_at = NOW()');
    values.push(id);

    return db.queryOne<Problem>(
      `UPDATE problems SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
  }

  async incrementSubmissionCount(id: string, success: boolean): Promise<void> {
    if (success) {
      await db.query(
        `UPDATE problems 
         SET total_submissions = total_submissions + 1,
             successful_submissions = successful_submissions + 1,
             acceptance_rate = (successful_submissions + 1)::decimal / (total_submissions + 1) * 100
         WHERE id = $1`,
        [id]
      );
    } else {
      await db.query(
        `UPDATE problems 
         SET total_submissions = total_submissions + 1,
             acceptance_rate = successful_submissions::decimal / (total_submissions + 1) * 100
         WHERE id = $1`,
        [id]
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.query(
      'DELETE FROM problems WHERE id = $1',
      [id]
    );
    return result.length > 0;
  }

  async count(): Promise<number> {
    const result = await db.query<{ count: string }>(
      'SELECT COUNT(*)::text as count FROM problems'
    );
    return parseInt(result[0].count, 10);
  }

  async countByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): Promise<number> {
    const result = await db.query<{ count: string }>(
      'SELECT COUNT(*)::text as count FROM problems WHERE difficulty = $1',
      [difficulty]
    );
    return parseInt(result[0].count, 10);
  }
}
