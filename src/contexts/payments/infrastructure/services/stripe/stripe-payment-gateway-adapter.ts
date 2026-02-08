import { Injectable } from "@/common/Injectable";
import { PaymentGateway } from "@/contexts/payments/domain/payment-gateway-port";
import { StripeService } from "./stripe.service";

@Injectable()
export class StripePaymentGatewayAdapter implements PaymentGateway {
    
    constructor(
        private readonly stripeService: StripeService,
    ) { }
    async createPayment(input: { orderId: string; amount: number; metadata?: Record<string, string> }): Promise<{ externalId: string; status: string, clientSecret: string }> {

        const intent = await this.stripeService.createPaymentIntent(input.amount, input.orderId);

        return {
            externalId: intent.id,
            status: intent.status,
            clientSecret: intent.client_secret!,
        }
    }

}