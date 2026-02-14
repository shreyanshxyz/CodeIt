import 'server-only';
import db from '../connection';
import { problems } from './problems-data';
import logger from '../../utils/logger';

export async function seedDatabase(): Promise<void> {
  logger.info('Starting database seeding...');

  try {
    for (const problem of problems) {
      const existing = await db.queryOne(
        'SELECT id FROM problems WHERE id = $1',
        [problem.id]
      );

      if (!existing) {
        await db.query(
          `INSERT INTO problems (
            id, title, description, difficulty, category, starter_code,
            starter_function_name, handler_function, examples, constraints, order_index
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            problem.id,
            problem.title,
            problem.description,
            problem.difficulty,
            problem.category,
            problem.starter_code,
            problem.starter_function_name,
            problem.handler_function,
            JSON.stringify(problem.examples),
            problem.constraints,
            problem.order_index,
          ]
        );

        if (problem.tags && problem.tags.length > 0) {
          for (const tag of problem.tags) {
            await db.query(
              'INSERT INTO problem_tags (problem_id, tag) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              [problem.id, tag]
            );
          }
        }

        logger.info(`Seeded problem: ${problem.title}`);
      } else {
        logger.debug(`Problem already exists: ${problem.title}`);
      }
    }

    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Error seeding database', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
}
