import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../../users/user.model';

@ObjectType()
export class LoginResponse {
  @Field()
  @IsString()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field(() => User)
  user: User;
}
