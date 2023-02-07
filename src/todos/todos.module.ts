import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.model';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { User } from '../users/user.model';
@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
