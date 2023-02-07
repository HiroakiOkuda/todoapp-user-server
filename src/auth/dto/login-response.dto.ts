import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from '../../users/user.model';

@ObjectType()
export class LoginResponse {
  @Field()
  @IsString()
  access_token: string;
}
