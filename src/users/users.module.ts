import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../todos/todo.model';
@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
