import { Injectable } from "@/common/Injectable";
import { PaymentRepository } from "../../domain";
import { UpdatePaymentInput } from "./update-payment-input";

@Injectable()
export class UpdatePaymentUseCase {

    constructor(
        private readonly paymentRepository: PaymentRepository
    ) { }

    async execute(input: UpdatePaymentInput) {

        return await this.paymentRepository.update(input);

    }

}