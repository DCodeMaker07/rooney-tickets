import { OrderItem } from "../../domain/order-item";

export interface CreateOrderInput {
    userId: string;
    concertId: string;
    amount: number;
    items: OrderItem[];
}