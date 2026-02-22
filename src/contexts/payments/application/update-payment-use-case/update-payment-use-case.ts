import { Injectable } from "@/common/Injectable";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PaymentRepository } from "../../domain";
import { UpdatePaymentInput } from "./update-payment-input";

@Injectable()
export class UpdatePaymentUseCase {

    constructor(
        private readonly paymentRepository: PaymentRepository,
        private eventEmitter: EventEmitter2,
    ) { }

    async execute(input: UpdatePaymentInput) {

        await this.eventEmitter.emit('update.order.payment.paid', { orderId: input.orderId });

        await this.paymentRepository.update(input);

    }

}