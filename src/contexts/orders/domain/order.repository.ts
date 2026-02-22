import { Order } from "./order";

type OrderStatus = 'PENDING' | 'PAID'| 'CANCELLED';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract update(input: {
    orderId : string;
    status  : OrderStatus;
    paidAt  : Date;
}): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
}