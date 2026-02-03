export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export class Order {

    constructor(
        public readonly userId: string,
        public readonly concertId: string,
        public readonly amount: number,
        public status: OrderStatus,
        public readonly expiresAt: Date,
        public readonly id?: string,
        public paidAt?: Date,
    ) { }

    public static entityToOrder(input: {
        id: string;
        status: OrderStatus;
        total: number;
        createdAt: Date;
        paidAt: Date | null;
        userId: string;
        concertId: string;
    }) {
        return new Order(input.userId, input.concertId, input.total, input.status, new Date(), input.id, input.paidAt!);
    }

    isExpired(now = new Date()): boolean {
        return now > this.expiresAt;
    }

    markAsPaid() {
        if (this.status !== 'PENDING') {
            throw new Error('Order cannot be paid');
        }

        this.status = 'PAID';
        this.paidAt = new Date();
    }

}