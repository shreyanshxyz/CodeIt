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
