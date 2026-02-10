import 'server-only';
import { UserRepository } from '../db/repositories/user.repository';
import { CreateUserDto, UpdateUserDto, User, UserPublic } from '@/types/database';
import { ConflictError, NotFoundError } from '../utils/errors';
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserService {
  private userRepo = new UserRepository();

  async getById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async register(data: { email: string; password: string; name: string }): Promise<User> {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await hash(data.password, SALT_ROUNDS);

    const user = await this.userRepo.create({
      email: data.email,
      password_hash: hashedPassword,
      name: data.name,
    });

    return user;
  }

  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password_hash) {
      return null;
    }

    const isValid = await compare(password, user.password_hash);
    if (!isValid) {
      return null;
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }

    const updated = await this.userRepo.update(id, data);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.userRepo.delete(id);
    if (!deleted) {
      throw new NotFoundError('User');
    }
  }

  async getAll(limit = 100, offset = 0): Promise<{ users: UserPublic[]; total: number }> {
    const users = await this.userRepo.findAll(limit, offset);
    const total = await this.userRepo.count();
    return { users, total };
  }
}
