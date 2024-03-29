import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

@ArgsType()
export class UpdateTodoInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  @MaxLength(50)
  title?: string | null;

  @Field({ nullable: true })
  @MaxLength(10000)
  description?: string | null;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(3)
  status?: number | null;

  @Field({ nullable: true })
  due?: Date | null;
}
