export class TransactionContext<I> {
  context: I;
}

export declare type IsolationLevel =
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE';

export interface ITransactionService<T> {
  startTransaction(
    isolationLevel?: IsolationLevel,
  ): Promise<TransactionContext<T>>;
  commit(context?: TransactionContext<T>): Promise<boolean>;
  rollback(context?: TransactionContext<T>): Promise<boolean>;
  rollbackIfActive(context?: TransactionContext<T>): Promise<boolean>;
}
