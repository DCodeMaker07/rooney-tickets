import { Injectable } from "@/contexts/common/Injectable";
import { NotFoundException } from "@nestjs/common";
import { PaymentRepository } from "../domain/payment.repository";
import { FindPaymentByIdDto } from "./find-payment-by-id.dto";

@Injectable()
export class FindPaymentByIdUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository
    ) { }

    async execute( findPaymentByIdDto: FindPaymentByIdDto ) {
        const payment = this.paymentRepository.getById(findPaymentByIdDto.id);

        if(!payment) {
            throw new NotFoundException(`Payment not found ${findPaymentByIdDto.id}`);
        }

        return {
            payment: payment.toValue()
        }
    }

}