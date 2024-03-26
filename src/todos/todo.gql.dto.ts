import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from './todo.entity';

@ObjectType('Todo')
export class TodoGqlDto {
  constructor(todo: Todo) {
    this.id = todo.todoId;
    this.title = todo.title;
    this.description = todo.description;
    this.status = todo.status;
  }

  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int)
  status: number;
}
