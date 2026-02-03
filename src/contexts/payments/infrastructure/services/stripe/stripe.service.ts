import Stripe from 'stripe';
import { Injectable } from "@/common/Injectable";
import { envs } from '@/config/envs';

@Injectable()
export class StripeService {

    private stripe: Stripe

    constructor() {
        this.stripe = new Stripe(envs.stripeSecretKey);
    }

    createPaymentIntent(amount: number, orderId: string) {
        return this.stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { orderId },
        });
    }

}