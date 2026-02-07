import { Payment } from "./payment";

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<Payment>;
  abstract update(payment: Payment): Promise<void>;
  abstract findByOrderId(orderId: string): Promise<Payment | null>;
  abstract findByExternalId(externalId: string): Promise<Payment | null>;
}