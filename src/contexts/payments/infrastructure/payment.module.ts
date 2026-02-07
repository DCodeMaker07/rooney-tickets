import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { PaymentController } from "./controller/payment.controller";
import { CreatePaymentUseCase } from "../application/create-payment-use-case/create-payment-use-case";
import { PaymentRepositoryAdapter } from "./database/postgres/payment-repository-adapter";
import { PaymentGateway, PaymentRepository } from "../domain";
import { StripePaymentGatewayAdapter } from "./services/stripe/stripe-payment-gateway-adapter";
import { StripeService } from "./services/stripe/stripe.service";
import { UpdatePaymentUseCase } from "../application/update-payment-use-case/update-payment-use-case";

@Module({
    controllers: [PaymentController],
    providers: [
        PrismaService,
        StripeService,
        CreatePaymentUseCase,
        UpdatePaymentUseCase,
        PaymentRepositoryAdapter,
        StripePaymentGatewayAdapter,
        {
            provide: PaymentRepository,
            useExisting: PaymentRepositoryAdapter,
        },
        {
            provide: PaymentGateway,
            useExisting: StripePaymentGatewayAdapter,
        }
    ],
    exports: []
})
export class PaymentModule { }