import { Module } from '@nestjs/common';
import { TodosResolver } from './todos.resolver';
import { TypeOrmTodosAccessorModule } from './todos.accessor.module';
import { TodosServiceModule } from './todos.service.module';
import { TodoGqlDtoFactoryModule } from './todo.gql.dto.factory';
@Module({
  imports: [
    TypeOrmTodosAccessorModule,
    TodosServiceModule,
    TodoGqlDtoFactoryModule,
  ],
  providers: [TodosResolver],
})
export class TodosModule {}
