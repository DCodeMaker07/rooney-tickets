export type PaymentProvider = 'STRIPE' | 'PAYPAL';

export class OrderCreatedEvent {
    constructor(
        public readonly orderId: string,
        public readonly amount: number,
        public readonly provider: PaymentProvider,
        public readonly externalId?: string,
        public readonly currency?: string,
    ) { }
}