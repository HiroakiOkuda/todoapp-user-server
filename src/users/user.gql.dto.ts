import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType('User')
export class UserGqlDto {
  constructor(user: User) {
    this.id = user.userId;
    this.username = user.username;
  }

  @Field((type) => ID)
  id: number;

  @Field()
  username: string;
}
