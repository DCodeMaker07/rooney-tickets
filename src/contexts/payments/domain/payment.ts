export type PaymentProvider = 'STRIPE' | 'PAYPAL';

export type PaymentStatus = 'PENDING' | 'REQUIRES_ACTION' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export class Payment {
  constructor(
    public readonly orderId: string,
    public readonly provider: PaymentProvider,
    public readonly externalId: string,
    public status: PaymentStatus,
    public readonly amount: number,
    public readonly currency: string,
    public readonly id?: string,
    public paymentMethod?: string,
    public last4?: string,
    public receiptUrl?: string,
    public metadata?: any,
    public failureReason?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  succeed(receiptUrl?: string) {
    this.status = 'SUCCEEDED';
    this.receiptUrl = receiptUrl;
  }

  fail(reason: string) {
    this.status = 'FAILED';
    this.failureReason = reason;
  }
}
