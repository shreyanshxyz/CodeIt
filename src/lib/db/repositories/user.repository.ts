import 'server-only';
import 'server-only';
import db from '../connection';
import { User, CreateUserDto, UpdateUserDto, UserPublic } from '@/types/database';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
  async findAll(limit = 100, offset = 0): Promise<UserPublic[]> {
    return db.query<UserPublic>(
      `SELECT id, email, name, avatar_url, github_username, role, created_at, updated_at
       FROM users 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  }

  async findById(id: string): Promise<User | null> {
    return db.queryOne<User>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return db.queryOne<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
  }

  async findByGithubUsername(username: string): Promise<User | null> {
    return db.queryOne<User>(
      'SELECT * FROM users WHERE github_username = $1',
      [username]
    );
  }

  async create(data: CreateUserDto): Promise<User> {
    const id = uuidv4();
    return db.queryOne<User>(
      `INSERT INTO users (id, email, password_hash, name, avatar_url, github_username)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, data.email, data.password_hash || null, data.name, data.avatar_url || null, data.github_username || null]
    ) as Promise<User>;
  }

  async update(id: string, data: UpdateUserDto): Promise<User | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.avatar_url !== undefined) {
      fields.push(`avatar_url = $${paramIndex++}`);
      values.push(data.avatar_url);
    }
    if (data.github_username !== undefined) {
      fields.push(`github_username = $${paramIndex++}`);
      values.push(data.github_username);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    return db.queryOne<User>(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
  }

  async updateRole(id: string, role: 'user' | 'admin'): Promise<User | null> {
    return db.queryOne<User>(
      `UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [role, id]
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return result.length > 0;
  }

  async count(): Promise<number> {
    const result = await db.query<{ count: string }>('SELECT COUNT(*)::text as count FROM users');
    return parseInt(result[0].count, 10);
  }
}
