import { Payment, PrimitivePayment } from "@/contexts/payments/domain/payment";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";

export class InMemoryPaymentRepository extends PaymentRepository {
    
    private payments: PrimitivePayment[] = [];

    create(payment: Payment) {
        this.payments.push(payment.toValue());
    }

    getById(id: string) {
        const payment = this.payments.find((payment) => payment.id === id);

        return payment ? new Payment(payment) : null;
    }

}