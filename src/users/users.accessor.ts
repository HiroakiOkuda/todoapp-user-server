import { DataSource, FindManyOptions, QueryRunner, Repository } from 'typeorm';
import { IUsersAccessor } from './users.accessor.interface';
import { User } from './user.entity';
import { TypeOrmUserModel } from './user.model';
import { TransactionContext } from '../common/transaction/transaction.service.interface';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';

export class FindUsersInput {
  id?: number;
  username?: string;
  email?: string;
}
export class TypeOrmUsersAccessor implements IUsersAccessor<QueryRunner> {
  constructor(
    @InjectRepository(TypeOrmUserModel)
    private readonly usersRepository: Repository<TypeOrmUserModel>,
    @InjectDataSource('reader')
    private readonly readerDataSource: DataSource,
  ) {}
  async findUsers(
    input: FindUsersInput,
    transaction?: TransactionContext<QueryRunner> | null,
  ): Promise<User[]> {
    try {
      const params: FindManyOptions<TypeOrmUserModel> = {};
      params.where = {};
      if (input.id) {
        params.where.userId = input.id;
      }
      if (input.username) {
        params.where.username = input.username;
      }
      if (input.email) {
        params.where.email = input.email;
      }
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmUserModel)
        : this.readerDataSource.getRepository(TypeOrmUserModel);
      const users = await repository.find(params);
      return users.map((u) => u.toUser());
    } catch (e) {
      throw new Error('Error finding users');
    }
  }

  async saveUser(
    users: User[],
    transaction?: TransactionContext<QueryRunner> | null,
  ): Promise<User[]> {
    try {
      const typeOrmModels = users.map((u) => {
        const model = this.usersRepository.create({
          userId: u.userId,
          username: u.username,
          email: u.email,
          password: u.password,
        });
        return model;
      });
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmUserModel)
        : this.usersRepository;
      await repository.insert(typeOrmModels);
      typeOrmModels.forEach((m, index) => {
        users[index].createdAt = m.createdAt;
        users[index].updatedAt = m.updatedAt;
      });
      return users;
    } catch (e) {
      throw new Error('Error saving users');
    }
  }

  async updateUser(
    user: Pick<User, 'userId'> & Partial<User>,
    transaction?: TransactionContext<QueryRunner> | null,
  ): Promise<Partial<User>> {
    try {
      const partial: Partial<TypeOrmUserModel> = {
        username: user.username,
        email: user.email,
      };
      Object.keys(partial).forEach((k) => {
        if (!Object.keys(user).includes(k)) {
          delete partial[k as keyof typeof partial];
        }
      });
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmUserModel)
        : this.usersRepository;
      await repository.update(user.userId, partial);
      return user;
    } catch (e) {
      throw new Error('Error updating user');
    }
  }

  async deleteUser(
    userId: number,
    transaction?: TransactionContext<QueryRunner> | null,
  ): Promise<boolean> {
    try {
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmUserModel)
        : this.usersRepository;
      const exists = await repository.findOne({
        where: { userId },
      });
      if (!exists) {
        return false;
      }
      const deleteResult = await repository.delete({ userId });
      if (!deleteResult || deleteResult.affected !== 1) {
        return false;
      }
      return true;
    } catch (e) {
      throw new Error('Error deleting user');
    }
  }
}
