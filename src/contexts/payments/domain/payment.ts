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
  ) { }

  public static entityToPayment(input: {
    id: string;
    status: PaymentStatus;
    createdAt: Date;
    provider: PaymentProvider;
    externalId: string;
    amount: number;
    currency: string;
    paymentMethod: string | null;
    last4: string | null;
    receiptUrl: string | null;
    metadata: string | null;
    failureReason: string | null;
    updatedAt: Date;
    orderId: string;
  }) {
    return new Payment(
      input.orderId,
      input.provider,
      input.externalId,
      input.status,
      input.amount,
      input.currency,
      input.id,
      input.paymentMethod!,
      input.last4!,
      input.receiptUrl!,
      input.metadata!,
      input.failureReason ?? '',
      input.createdAt, input.updatedAt
    );
  }

  succeed(receiptUrl?: string) {
    this.status = 'SUCCEEDED';
    this.receiptUrl = receiptUrl;
  }

  fail(reason: string) {
    this.status = 'FAILED';
    this.failureReason = reason;
  }
}
