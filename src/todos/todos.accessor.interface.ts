import { TransactionContext } from '../common/transaction/transaction.service.interface';
import { FindTodosInput } from './todos.accessor';
import { Todo } from './todo.entity';

export interface ITodosAccessor<T> {
  findTodos(
    input: FindTodosInput,
    transaction?: TransactionContext<T> | null,
  ): Promise<Todo[]>;

  saveTodos(
    Todos: Todo[],
    transaction?: TransactionContext<T> | null,
  ): Promise<Todo[]>;

  updateTodo(
    Todo: Pick<Todo, 'todoId'> & Partial<Todo>,
    transaction?: TransactionContext<T> | null,
  ): Promise<Partial<Todo>>;

  deleteTodo(
    TodoId: number,
    transaction?: TransactionContext<T> | null,
  ): Promise<boolean>;
}
