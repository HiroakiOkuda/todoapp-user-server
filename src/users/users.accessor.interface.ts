import { TransactionContext } from '../common/transaction/transaction.service.interface';
import { User } from './user.entity';
import { FindUsersInput } from './users.accessor';

export interface IUsersAccessor<T> {
  findUsers(
    input: FindUsersInput,
    transaction?: TransactionContext<T> | null,
  ): Promise<User[]>;

  saveUser(
    users: User[],
    transaction?: TransactionContext<T> | null,
  ): Promise<User[]>;

  updateUser(
    user: Pick<User, 'userId'> & Partial<User>,
    transaction?: TransactionContext<T> | null,
  ): Promise<Partial<User>>;

  deleteUser(
    userId: number,
    transaction?: TransactionContext<T> | null,
  ): Promise<boolean>;
}
