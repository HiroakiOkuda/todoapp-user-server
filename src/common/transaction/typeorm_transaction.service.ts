import { DataSource, QueryRunner } from 'typeorm';
import {
  ITransactionService,
  IsolationLevel,
  TransactionContext,
} from './transaction.service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmTransactionService
  implements ITransactionService<QueryRunner>
{
  constructor(private readonly dataSource: DataSource) {}
  async startTransaction(
    isolationLevel?: IsolationLevel,
  ): Promise<TransactionContext<QueryRunner>> {
    let queryRunner: QueryRunner | null = null;
    try {
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction(isolationLevel);
      return { context: queryRunner };
    } catch (e) {
      if (queryRunner && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      if (queryRunner) {
        await queryRunner.release();
      }
      throw e;
    }
  }

  async commit(context: TransactionContext<QueryRunner>): Promise<boolean> {
    const queryRunner = context.context;
    try {
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      } else {
        throw new Error('commit is called but transaction is not active');
      }
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
    } finally {
      if (!queryRunner.isReleased) {
        await context.context.release();
      }
    }
    return queryRunner.isReleased;
  }

  async rollback(context: TransactionContext<QueryRunner>): Promise<boolean> {
    const queryRunner = context.context;
    try {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
    } catch (e) {
      console.error('Failed to rollback transaction', e);
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
    return queryRunner.isReleased;
  }

  async rollbackIfActive(
    context?: TransactionContext<QueryRunner>,
  ): Promise<boolean> {
    return this.rollback(context);
  }
}
