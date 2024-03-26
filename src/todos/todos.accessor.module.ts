import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoModel } from './todo.model';
import { TypeOrmTodosAccessor } from './todos.accessor';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmTodoModel])],
  providers: [{ provide: 'TodosAccessor', useClass: TypeOrmTodosAccessor }],
  exports: [{ provide: 'TodosAccessor', useClass: TypeOrmTodosAccessor }],
})
export class TypeOrmTodosAccessorModule {}
