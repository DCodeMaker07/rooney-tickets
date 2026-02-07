import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { CreatePaymentUseCase } from "@/contexts/payments/application/create-payment-use-case";
import type { Request, Response } from 'express';

@Controller('payments')
export class PaymentController{

    constructor(
        private createPaymentUseCase: CreatePaymentUseCase,
    ) { }

    @Post('webhook')
    async stripeWebHook(@Req() req: Request, @Res() res: Response) {
        console.log('stripeWebhook called')
        return 'webhook';
    }

}