import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ITodosAccessor } from '../todos.accessor.interface';
import { ITransactionService } from '../../common/transaction/transaction.service.interface';
import { Todo } from '../todo.entity';
import assert from 'assert';

export class TodosUpdateServiceInput {
  id: number;
  title?: string;
  description?: string;
}

@Injectable()
export class TodosUpdateService {
  constructor(
    @Inject('TodosAccessor')
    private readonly todosAccessor: ITodosAccessor<QueryRunner>,
    @Inject('TransactionService')
    private readonly transactionService: ITransactionService<any>,
  ) {}
  async updateTodo(input: TodosUpdateServiceInput): Promise<Todo> {
    const todos = await this.todosAccessor.findTodos({ id: input.id });
    if (!todos || todos.length !== 1) {
      throw new Error('Invalid todo id');
    }
    const transaction = await this.transactionService.startTransaction();
    try {
      // todo: lockをとる
      const partial = {
        todoId: input.id,
        title: input.title,
        description: input.description,
      };
      await this.todosAccessor.updateTodo(partial, transaction);
      const newTodos = await this.todosAccessor.findTodos(
        {
          id: partial.todoId,
        },
        transaction,
      );
      assert.equal(newTodos.length, 1, new Error('Failed to get newItems.'));
      await this.transactionService.commit(transaction);
      return newTodos[0];
    } catch (e) {
      await this.transactionService.rollbackIfActive(transaction);
      throw new Error(e);
    }
  }
}
