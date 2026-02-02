export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export class Order {
    
    constructor(
        public readonly userId: string,
        public readonly concertId: string,
        public readonly amount: number,
        public status: OrderStatus,
        public readonly expiresAt: Date,
        public readonly paidAt?: Date,
    ) { }

    isExpired(now = new Date()): boolean {
        return now > this.expiresAt;
    }

    markAsPaid() {
        if(this.status !== 'PENDING'){
            throw new Error('Order cannot be paid');
        }

        this.status = 'PAID';
    }

}