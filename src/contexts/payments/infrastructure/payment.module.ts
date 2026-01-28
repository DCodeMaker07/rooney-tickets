import { Module } from "@nestjs/common";
import { PaymentController } from "./controller/payment-controller";
import { CreatePaymentUseCase } from "../application/create-payment-use-case";
import { InMemoryPaymentRepository } from "./database/in-memory/in-memory-repository";
import { PaymentRepository } from "../domain/payment.repository";
import { FindPaymentByIdUseCase } from "../application/find-payment-by-id-use-case";

@Module({
    controllers: [PaymentController],
    providers: [
        CreatePaymentUseCase,
        FindPaymentByIdUseCase,
        InMemoryPaymentRepository,
        {
            provide: PaymentRepository,
            useExisting: InMemoryPaymentRepository,
        },
    ],
    exports: [ CreatePaymentUseCase, FindPaymentByIdUseCase ]
})
export class PaymentModule { }