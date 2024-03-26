import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserGqlDto } from '../../users/user.gql.dto';

@ObjectType('LoginResponse')
export class LoginResponse {
  @Field()
  @IsString()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field(() => UserGqlDto)
  user: UserGqlDto;
}
