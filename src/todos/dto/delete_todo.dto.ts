import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteTodoInput {
  @Field((type) => Int)
  id: number;
}
