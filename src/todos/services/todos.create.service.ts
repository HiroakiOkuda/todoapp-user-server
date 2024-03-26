import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../todo.entity';
import { QueryRunner } from 'typeorm';
import { ITodosAccessor } from '../todos.accessor.interface';

export class CreateTodoServiceInput {
  title: string;
  description?: string;
  status: number;
  due?: Date;
}

@Injectable()
export class TodosCreateService {
  constructor(
    @Inject('TodosAccessor')
    public readonly todosAccessor: ITodosAccessor<QueryRunner>,
  ) {}

  async createTodo(input: CreateTodoServiceInput): Promise<Todo> {
    try {
      const todo = new Todo(
        Date.now(),
        input.title,
        input.description,
        input.status,
        input.due,
      );
      const todos = await this.todosAccessor.saveTodos([todo]);
      if (!todos || todos.length !== 1) {
        throw new Error('Failed to create todo');
      }
      return todos[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
