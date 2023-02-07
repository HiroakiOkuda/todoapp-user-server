import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @MaxLength(50)
  username: string;
  @Field()
  @MaxLength(127)
  email: string;
  @Field()
  @MaxLength(127)
  password: string;
}
