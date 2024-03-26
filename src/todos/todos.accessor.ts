import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource, FindManyOptions, QueryRunner } from 'typeorm';
import { TypeOrmTodoModel } from './todo.model';
import { Todo } from './todo.entity';
import { TransactionContext } from '../common/transaction/transaction.service.interface';
import { ITodosAccessor } from './todos.accessor.interface';

export class FindTodosInput {
  id: number;
}

export class TypeOrmTodosAccessor implements ITodosAccessor<QueryRunner> {
  constructor(
    @InjectRepository(TypeOrmTodoModel)
    private readonly todosRepository: Repository<TypeOrmTodoModel>,
    @InjectDataSource('reader')
    private readerDataSource: DataSource,
  ) {}

  async findTodos(
    input: FindTodosInput,
    transaction?: TransactionContext<QueryRunner> | null,
  ): Promise<Todo[]> {
    try {
      const params: FindManyOptions<TypeOrmTodoModel> = {};
      params.where = {};
      if (input.id) {
        params.where.todoId = input.id;
      }
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmTodoModel)
        : this.readerDataSource.getRepository(TypeOrmTodoModel);
      const todos = await repository.find(params);
      return todos.map((todo) => todo.toTodo());
    } catch (e) {
      throw new Error('Error finding todos');
    }
  }

  async saveTodos(
    todos: Todo[],
    transaction?: TransactionContext<QueryRunner> | null,
  ) {
    const typeOrmModels = todos.map((t) =>
      this.todosRepository.create({
        todoId: t.todoId,
        title: t.title,
        description: t.description,
        status: t.status,
        due: t.due,
      }),
    );

    const repository = transaction
      ? transaction.context.manager.getRepository(TypeOrmTodoModel)
      : this.todosRepository;
    await repository.insert(typeOrmModels);
    typeOrmModels.forEach((m, index) => {
      todos[index].createdAt = m.createdAt;
      todos[index].updatedAt = m.updatedAt;
    });
    return todos;
  }

  async updateTodo(
    todo: Pick<Todo, 'todoId'> & Partial<Todo>,
    transaction?: TransactionContext<QueryRunner> | null,
  ) {
    try {
      const partial: Partial<TypeOrmTodoModel> = {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due: todo.due,
      };
      Object.keys(partial).forEach((k) => {
        if (!Object.keys(todo).includes(k)) {
          delete partial[k as keyof typeof partial];
        }
      });
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmTodoModel)
        : this.todosRepository;
      await repository.update(todo.todoId, partial);
      return todo;
    } catch (e) {
      throw new Error('Error updating todo');
    }
  }

  async deleteTodo(
    todoId: number,
    transaction?: TransactionContext<QueryRunner> | null,
  ) {
    try {
      const repository = transaction
        ? transaction.context.manager.getRepository(TypeOrmTodoModel)
        : this.todosRepository;
      const exists = await repository.findOne({
        where: { todoId },
      });
      if (!exists) {
        return false;
      }
      const deleteResult = await repository.delete(todoId);
      if (!deleteResult || deleteResult.affected !== 1) {
        return false;
      }
      return true;
    } catch (e) {
      throw e;
    }
  }
}
