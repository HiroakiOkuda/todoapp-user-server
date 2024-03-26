import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmUsersAccessorModule } from './users.accessor.module';
import { TypeOrmTransactionServiceModule } from '../common/transaction/typeorm_transaction.service.module';
@Module({
  imports: [TypeOrmUsersAccessorModule, TypeOrmTransactionServiceModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersServiceModule {}
