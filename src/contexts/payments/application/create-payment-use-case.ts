import { Injectable } from '@/common/Injectable';
import { OrderCreatedEvent } from '@/contexts/orders/domain/order.event';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentRepository } from '../domain/payment.repository';
import { Payment } from '../domain/payment';

@Injectable()
export class CreatePaymentUseCase {

    constructor(
        private readonly PaymentRepository: PaymentRepository,
    ) { }

    @OnEvent('order.created')
    async execute(input: OrderCreatedEvent): Promise<Payment> {
        const payment = new Payment(
            input.orderId,
            input.provider,
            input.externalId ?? '',
            'PENDING',
            input.amount,
            input.currency ?? 'USD',
        );

        return this.PaymentRepository.create(payment);
    }

}