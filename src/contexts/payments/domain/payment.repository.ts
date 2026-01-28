import { Payment } from "./payment";

export abstract class PaymentRepository {
    abstract create(payment: Payment): void;
    abstract getById(id: string): Payment | null;
}