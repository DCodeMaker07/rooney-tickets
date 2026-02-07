import { PaymentProvider, PaymentStatus } from "../../domain";

export interface UpdatePaymentInput {

    provider: PaymentProvider;
    externalId: string;
    status: PaymentStatus;
    paymentMethod: string;

}