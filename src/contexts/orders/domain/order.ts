import { OrderItem } from "./order-item";

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export class Order {

    constructor(
        public readonly userId: string,
        public readonly concertId: string,
        public status: OrderStatus,
        public readonly total: number,
        public readonly items: OrderItem[],
        public readonly expiresAt: Date,
        public readonly id?: string,
        public paidAt?: Date,
    ) { }

    public static entityToOrder(input: {
        id: string;
        status: OrderStatus;
        items: OrderItem[];
        total: number;
        createdAt: Date;
        paidAt: Date | null;
        userId: string;
        concertId: string;
    }) {
        return new Order(input.userId, input.concertId, input.status, input.total, input.items, new Date(), input.id, input.paidAt!);
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

    getTotalPrice() {
        return this.items.reduce((acc, value) => acc + value.price, 0);
    }

}