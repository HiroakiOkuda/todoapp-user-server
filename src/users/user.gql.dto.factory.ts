import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserGqlDto } from './user.gql.dto';

const UserGqlDtoFactory = {
  provide: 'UserGqlDtoFactory',
  useFactory: () => {
    return {
      create: (users?: User[]) => {
        return users ? users.map((i) => new UserGqlDto(i)) : [];
      },
    };
  },
};
export type UserGqlDtoFactory = {
  create: (users: User[]) => UserGqlDto[];
};

@Module({
  providers: [UserGqlDtoFactory],
  exports: [UserGqlDtoFactory],
})
export class UserGqlDtoFactoryModule {}
