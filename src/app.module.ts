import { Module } from '@nestjs/common';
import { PaymentModule } from './contexts/payments/infrastructure/payment.module';
import { QueueModule } from './contexts/queue/infrastructure/queue.module';

@Module({
  imports: [
    PaymentModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
