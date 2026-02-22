type PaymentStatus = 'PENDING' | 'REQUIRES_ACTION' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
type PaymentProvider = 'STRIPE' | 'PAYPAL';

export interface UpdatePaymentInput {
    paymentId       : string;
    status          : PaymentStatus;
    externalId      : string;
    paymentMethod   : string;
    provider        : PaymentProvider;
    receiptUrl      : string;
    failureReason   : string;
    last4           : string;
    metadata        : string;
}