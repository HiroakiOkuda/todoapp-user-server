import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserModel } from './user.model';
import { TypeOrmUsersAccessor } from './users.accessor';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserModel])],
  providers: [{ provide: 'UsersAccessor', useClass: TypeOrmUsersAccessor }],
  exports: [{ provide: 'UsersAccessor', useClass: TypeOrmUsersAccessor }],
})
export class TypeOrmUsersAccessorModule {}
