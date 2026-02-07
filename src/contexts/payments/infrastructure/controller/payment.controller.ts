import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { CreatePaymentUseCase } from "@/contexts/payments/application/create-payment-use-case/create-payment-use-case";
import { OnEvent } from "@nestjs/event-emitter";
import { envs } from "@/config/envs";
import type { Request, Response } from 'express';
import Stripe from "stripe";
import { CreatePaymentSessionDto } from "./dto/create-payment-session-dto";
import { StripeService } from '../services/stripe/stripe.service';
import { UpdatePaymentUseCase } from "../../application/update-payment-use-case/update-payment-use-case";

@Controller('payments')
export class PaymentController{

    constructor(
        private readonly createPaymentUseCase: CreatePaymentUseCase,
        private readonly updatePaymentUseCase: UpdatePaymentUseCase,
        private readonly stripeService: StripeService,
    ) { }

    @OnEvent('order.created')
    createPaymentSession(createPaymentSessionDto: CreatePaymentSessionDto) {
        return this.createPaymentUseCase.execute(createPaymentSessionDto);
    }

    @Post('webhook')
    async stripeWebHook(@Req() req: Request, @Res() res: Response) {
        
        const sig = req.headers['stripe-signature'] as string;
        
        let event: Stripe.Event;

        const endpointSecret = envs.stripeEndpointSecret;

        try {
        
            event = this.stripeService.getStripe().webhooks.constructEvent(req['rawBody'], sig, endpointSecret);

        } catch (error) {
            res.status(400).send(`Webhook Error: ${error.message}`)
            return;
        }

        // console.log({event});

        // console.info(event.data);

        if(event.type === 'payment_intent.succeeded') {
            await this.updatePaymentUseCase.execute({
                externalId: event.data.object.id,
                paymentMethod: event.data.object.payment_method![0],
                provider: 'STRIPE',
                status: 'SUCCEEDED',
            });
        }

        return res.status(200).json({ received: true });
    }

}