import { Module } from '@nestjs/common';
import { TodosAccessService } from './services/todos.access.service';
import { TodosCreateService } from './services/todos.create.service';
import { TodosDeleteService } from './services/todos.delete.service';
import { TodosUpdateService } from './services/todos.update.service';
import { TypeOrmTodosAccessorModule } from './todos.accessor.module';
import { TypeOrmTransactionServiceModule } from '../common/transaction/typeorm_transaction.service.module';

@Module({
  imports: [TypeOrmTodosAccessorModule, TypeOrmTransactionServiceModule],
  providers: [
    TodosAccessService,
    TodosCreateService,
    TodosDeleteService,
    TodosUpdateService,
  ],
  exports: [
    TodosAccessService,
    TodosCreateService,
    TodosDeleteService,
    TodosUpdateService,
  ],
})
export class TodosServiceModule {}
