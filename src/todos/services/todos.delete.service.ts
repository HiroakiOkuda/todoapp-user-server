import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ITodosAccessor } from '../todos.accessor.interface';

export class TodosDeleteServiceInput {
  id: number;
}

@Injectable()
export class TodosDeleteService {
  constructor(
    @Inject('TodosAccessor')
    private readonly todosAccessor: ITodosAccessor<QueryRunner>,
  ) {}

  async deleteTodo(input: TodosDeleteServiceInput): Promise<boolean> {
    try {
      return await this.todosAccessor.deleteTodo(input.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
