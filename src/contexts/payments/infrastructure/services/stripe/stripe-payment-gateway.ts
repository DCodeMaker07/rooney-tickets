import { PaymentGateway } from "@/contexts/payments/domain/payment.gateway";

export class StripePaymentGatewayAdapter implements PaymentGateway {
    createPayment(input: { orderId: string; amount: number; }): Promise<{ externalId: string; status: "pending" | "paid" | "failed"; }> {
        throw new Error("Method not implemented.");
    }

}