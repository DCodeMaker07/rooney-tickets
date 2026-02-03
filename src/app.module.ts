import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentModule } from './contexts/payments/infrastructure/payment.module';
import { QueueModule } from './contexts/queue/infrastructure/queue.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true, // 'order.*'
      delimiter: '.', // default
      newListener: false,
      removeListener: false,
      maxListeners: 20, // listeners
      verboseMemoryLeak: true,  // for debugging
      ignoreErrors: false,
    }),
    PaymentModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
