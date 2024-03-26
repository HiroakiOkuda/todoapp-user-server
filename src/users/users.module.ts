import { Module } from '@nestjs/common';
import { UsersServiceModule } from './users.service.module';
import { TypeOrmUsersAccessorModule } from './users.accessor.module';
import { UsersResolver } from './users.resolver';
import { UserGqlDtoFactoryModule } from './user.gql.dto.factory';
@Module({
  imports: [
    TypeOrmUsersAccessorModule,
    UsersServiceModule,
    UserGqlDtoFactoryModule,
  ],
  providers: [UsersResolver],
  exports: [UsersResolver],
})
export class UsersModule {}
