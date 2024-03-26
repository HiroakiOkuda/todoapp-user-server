import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../todo.entity';
import { QueryRunner } from 'typeorm';
import { ITodosAccessor } from '../todos.accessor.interface';

export class TodosAccessServiceInput {
  id?: number;
}

@Injectable()
export class TodosAccessService {
  constructor(
    @Inject('TodosAccessor')
    private readonly todosAccessor: ITodosAccessor<QueryRunner>,
  ) {}

  async findTodos(input: TodosAccessServiceInput): Promise<Todo[]> {
    return await this.todosAccessor.findTodos({ id: input.id });
  }
}
