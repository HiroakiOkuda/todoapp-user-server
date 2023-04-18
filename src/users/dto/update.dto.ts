import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@ArgsType()
export class UpdateOneUserArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(127)
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(127)
  password: string;
}
