import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePaymentUseCase } from "@/contexts/payments/application/create-payment-use-case";
import { CreatePaymentHttpDto } from "./dto/create-payment.http-dto";
import { PrimitivePayment } from "../../domain/payment";
import { FindPaymentByIdUseCase } from "../../application/find-payment-by-id-use-case";

@Controller('payments')
export class PaymentController{

    constructor(
        private createPaymentUseCase: CreatePaymentUseCase,
        private findPaymentByIdUseCase: FindPaymentByIdUseCase,
    ) { }

    @Post()
    async run(@Body() createPaymentHttpDto: CreatePaymentHttpDto) {

        return await this.createPaymentUseCase.execute({
            amount: createPaymentHttpDto.amount,
            customerId: createPaymentHttpDto.customerId
        });

    }

    @Get(':id')
    async getById(@Param('id') id: string ) {
        return await this.findPaymentByIdUseCase.execute({ id });
    }

}