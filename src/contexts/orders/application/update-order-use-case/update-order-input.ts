type OrderStatus = 'PENDING' | 'PAID'| 'CANCELLED';

export interface UpdateOrderInput {
    orderId : string;
    status  : OrderStatus;
    paidAt  : Date;
}