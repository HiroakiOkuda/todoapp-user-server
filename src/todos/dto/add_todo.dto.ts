import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

@InputType()
export class AddTodoInput {
  @Field()
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @MaxLength(10000)
  description?: string | null;

  @Field((type) => Int)
  @Min(1)
  @Max(3)
  status: number;

  @Field({ nullable: true })
  due?: Date | null;
}
