export type PaymentProvider = 'STRIPE' | 'PAYPAL';

export interface OrderCreatedEvent {
    orderId: string,
    amount: number,
    provider: PaymentProvider,
    externalId?: string,
    currency?: string,
}