import { Injectable } from "@/common/Injectable";
import { Payment } from "@/contexts/payments/domain/payment";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class PaymentRepositoryAdapter implements PaymentRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(payment: Payment): Promise<Payment> {

        const created = await this.prisma.payment.create({
            data: {
                orderId: payment.orderId,
                provider: payment.provider,
                externalId: payment.externalId,
                status: payment.status,
                amount: payment.amount,
                currency: payment.currency,
                metadata: payment.metadata,
            }
        });

        return created as Payment;

    }
    async update(payment: Payment): Promise<void> {
        await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: payment.status,
                receiptUrl: payment.receiptUrl,
                failureReason: payment.failureReason,
                paymentMethod: payment.paymentMethod,
                last4: payment.last4,
                metadata: payment.metadata,
            }
        });
    }
    async findByOrderId(orderId: string): Promise<Payment | null> {
        return this.prisma.payment.findUnique({
            where: { id: orderId }
        })
    }
    async findByExternalId(externalId: string): Promise<Payment | null> {
        const paymentDB = await this.prisma.payment.findUnique({
            where: { externalId }
        })

        return paymentDB;
    }

}