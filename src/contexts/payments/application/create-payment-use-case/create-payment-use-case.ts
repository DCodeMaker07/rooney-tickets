import { Injectable } from '@/common/Injectable';
import { OrderCreatedEvent } from '@/contexts/orders/domain/order-event';
import { Payment, PaymentGateway, PaymentRepository, PaymentStatus } from '../../domain';

@Injectable()
export class CreatePaymentUseCase {

    constructor(
        private readonly PaymentRepository: PaymentRepository,
        private readonly paymentGateway: PaymentGateway,
    ) { }

    async execute(input: OrderCreatedEvent) {
        // Persist payment
        const paymentObject = new Payment(
            input.orderId,
            input.provider,
            '',
            'PENDING',
            input.amount,
            input.currency ?? 'USD',
        );
        
        const paymentCreated = await this.PaymentRepository.create(paymentObject);

        // Create paymentIntent in payment external service
        const paymentExternal = await this.paymentGateway.createPayment({ amount: input.amount, orderId: input.orderId, paymentId: paymentObject.id! });
    
        return {
            provider: paymentCreated.provider,
            clientSecret: paymentExternal.clientSecret,
        };
    }

}