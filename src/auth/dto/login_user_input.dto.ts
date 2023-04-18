import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class LoginUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
