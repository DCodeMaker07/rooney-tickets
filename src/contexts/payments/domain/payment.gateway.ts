export abstract class PaymentGateway {
    abstract createPayment(input: {
        orderId: string;
        amount: number;
    }): Promise<{
        externalId: string;
        status: 'pending' | 'paid' | 'failed';
    }>;
}