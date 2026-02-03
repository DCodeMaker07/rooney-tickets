import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePaymentUseCase } from "@/contexts/payments/application/create-payment-use-case";
import { CreatePaymentHttpDto } from "./dto/create-payment.http-dto";

@Controller('payments')
export class PaymentController{

    constructor(
        private createPaymentUseCase: CreatePaymentUseCase,
    ) { }

}