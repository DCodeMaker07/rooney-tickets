export abstract class PaymentGateway {
    abstract createPayment(input: {
        orderId: string;
        amount: number;
        paymentId: string;
    }): Promise<{
        externalId: string;
        status: string;
        clientSecret: string;
    }>;
}