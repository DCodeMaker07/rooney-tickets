import { Module } from "@nestjs/common";
import { PaymentController } from "./controller/payment-controller";
import { CreatePaymentUseCase } from "../application/create-payment-use-case";
import { InMemoryPaymentRepository } from "./database/in-memory/in-memory-repository";
import { PaymentRepository } from "../domain/payment.repository";

@Module({
    controllers: [PaymentController],
    providers: [
        CreatePaymentUseCase,
        InMemoryPaymentRepository,
        {
            provide: PaymentRepository,
            useExisting: InMemoryPaymentRepository,
        },
    ],
    exports: [ CreatePaymentUseCase ]
})
export class PaymentModule { }