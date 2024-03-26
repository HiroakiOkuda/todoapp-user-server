import { Module } from '@nestjs/common';
import { TypeOrmTransactionService } from './typeorm_transaction.service';

@Module({
  providers: [
    { provide: 'TransactionService', useClass: TypeOrmTransactionService },
  ],
  exports: [
    { provide: 'TransactionService', useClass: TypeOrmTransactionService },
  ],
})
export class TypeOrmTransactionServiceModule {}
