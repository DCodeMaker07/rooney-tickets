import { Order } from "./order";

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract update(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
}