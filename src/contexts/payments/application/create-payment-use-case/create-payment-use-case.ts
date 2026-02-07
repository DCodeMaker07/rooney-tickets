import { Injectable } from '@/common/Injectable';
import { OrderCreatedEvent } from '@/contexts/orders/domain/order-event';
import { Payment, PaymentGateway, PaymentRepository } from '../../domain';

@Injectable()
export class CreatePaymentUseCase {

    constructor(
        private readonly PaymentRepository: PaymentRepository,
        private readonly paymentGateway: PaymentGateway,
    ) { }

    async execute(input: OrderCreatedEvent): Promise<Payment> {

        // Create paymentIntent in payment external service
        const intent = await this.paymentGateway.createPayment({ amount: input.amount, orderId: input.orderId });

        // Persist payment
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