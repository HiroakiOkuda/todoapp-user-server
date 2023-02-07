import { Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

export class LoginInput {
  @Field()
  @MaxLength(127)
  email: string;
  @Field()
  @MaxLength(127)
  password: string;
}
