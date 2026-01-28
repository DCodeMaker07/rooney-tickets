import { Injectable } from '@/contexts/common/Injectable';
import { PaymentRepository } from '@/contexts/payments/domain/payment.repository'
import { Payment } from '@/contexts/payments/domain/payment'
import { CreatePaymentDto } from './create-payment-use-case.dto';
import { PrimitivePayment } from '../domain/payment';

@Injectable()
export class CreatePaymentUseCase {

    constructor(
        private readonly repository: PaymentRepository
    ) { }

    async execute(dto: CreatePaymentDto): Promise<{ payment: PrimitivePayment }> {
        const payment = Payment.create(dto);

        await this.repository.create(payment);

        return {
            payment: payment.toValue()
        }
    }

}