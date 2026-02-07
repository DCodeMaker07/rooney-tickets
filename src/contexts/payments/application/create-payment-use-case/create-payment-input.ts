import { PaymentProvider } from "../../domain/payment";

export interface CreatePaymentInput {
    orderId: string;
    amount: number;
    provider: PaymentProvider;
    externalId: string;
    currency?: string;
}