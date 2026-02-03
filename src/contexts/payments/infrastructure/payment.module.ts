import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { PaymentController } from "./controller/payment-controller";
import { CreatePaymentUseCase } from "../application/create-payment-use-case";
import { PaymentRepository } from "../domain/payment.repository";
import { PaymentRepositoryAdapter } from "./database/postgres/payment-repository-adapter";

@Module({
    controllers: [PaymentController],
    providers: [
        PrismaService,
        CreatePaymentUseCase,
        PaymentRepositoryAdapter,
        {
            provide: PaymentRepository,
            useExisting: PaymentRepositoryAdapter,
        },
    ],
    exports: []
})
export class PaymentModule { }