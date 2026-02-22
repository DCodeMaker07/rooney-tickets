import { PaymentProvider, PaymentStatus } from "../../domain";

export interface UpdatePaymentInput {

    orderId: string;
    paymentId: string;
    provider: PaymentProvider;
    externalId: string;
    status: PaymentStatus;
    paymentMethod: string;

}