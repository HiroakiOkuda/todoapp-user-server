import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { User } from './user.entity';
import { IUsersAccessor } from './users.accessor.interface';
import { ITransactionService } from '../common/transaction/transaction.service.interface';

/**
 * @description User情報を扱うクラス
 */
export class UpdateOneUserServiceInput {
  id: number;
  username?: string;
  email?: string;
  password?: string;
}

export class RegisterUserServiceInput {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersAccessor')
    private readonly usersAccessor: IUsersAccessor<QueryRunner>,
    @Inject('TransactionService')
    private readonly transactionService: ITransactionService<any>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const users = await this.usersAccessor.findUsers({
        email,
      });
      if (!users || users.length !== 1) {
        throw new Error('User not found');
      }
      return users[0];
    } catch (e) {
      throw new Error('Failed to getUsers');
    }
  }

  async findOneByUsername(
    username: User['username'],
  ): Promise<User | undefined> {
    try {
      const users = await this.usersAccessor.findUsers({
        username,
      });
      if (!users || users.length !== 1) {
        throw new Error('User not found');
      }
      return users[0];
    } catch (e) {
      throw new Error('Failed to getUsers');
    }
  }

  async updateUser(args: UpdateOneUserServiceInput): Promise<User> {
    const { username, email, password } = args;
    const transaction = await this.transactionService.startTransaction();
    try {
      const updatedUser = new User(Date.now(), username, email, password);
      await this.usersAccessor.updateUser(updatedUser);
      await this.transactionService.commit(transaction);
      return updatedUser;
    } catch (e) {
      await this.transactionService.rollbackIfActive(transaction);
      throw new Error('Failed to update user');
    }
  }

  async registerUser(args: RegisterUserServiceInput): Promise<User> {
    const { username, email, password } = args;
    const transaction = await this.transactionService.startTransaction();
    try {
      const newUser = new User(Date.now(), username, email, password);
      await this.usersAccessor.saveUser([newUser]);
      await this.transactionService.commit(transaction);
      return newUser;
    } catch (e) {
      await this.transactionService.rollbackIfActive(transaction);
      throw new Error('Failed to register user');
    }
  }
}
