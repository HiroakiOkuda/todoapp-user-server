import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoGqlDto } from './todo.gql.dto';

const TodoGqlDtoFactory = {
  provide: 'TodoGqlDtoFactory',
  useFactory: () => {
    return {
      create: (todos?: Todo[]) =>
        todos ? todos.map((i) => new TodoGqlDto(i)) : [],
    };
  },
};
export type TodoGqlDtoFactory = {
  create: (todos: Todo[]) => TodoGqlDto[];
};

@Module({
  providers: [TodoGqlDtoFactory],
  exports: [TodoGqlDtoFactory],
})
export class TodoGqlDtoFactoryModule {}
