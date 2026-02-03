import { Injectable } from '@/common/Injectable';
import { PaymentRepository } from '../domain/payment.repository';
import { CreatePaymentInput } from './create-payment-input';
import { Payment } from '../domain/payment';

@Injectable()
export class CreatePaymentUseCase {

    constructor(
        private readonly PaymentRepository: PaymentRepository,
    ) { }

    async execute(input: CreatePaymentInput): Promise<Payment> {
        const payment = new Payment(
            input.orderId,
            input.provider,
            input.externalId,
            'PENDING',
            input.amount,
            input.currency ?? 'USD',
        );

        return this.PaymentRepository.create(payment);
    }

}