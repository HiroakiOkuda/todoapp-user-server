import { Field, ArgsType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@ArgsType()
export class UpdateOneUserArgs {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username: string;

  @Field()
  @IsOptional()
  @IsEmail()
  @IsString()
  @MaxLength(127)
  email: string;

  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(127)
  password: string;
}
