import { Injectable } from "@/common/Injectable";
import { Payment } from "@/contexts/payments/domain/payment";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

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

        return Payment.entityToPayment({
            ...created,
            amount: parseFloat(`${created.amount}`),
            metadata: `${created.metadata}`,
        });

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
        const payment = await this.prisma.payment.findUnique({
            where: { id: orderId }
        })

        if (!payment) throw new NotFoundException(`payment with orderId [${orderId}] not found`);

        return Payment.entityToPayment({
            ...payment,
            amount: parseFloat(`${payment.amount}`),
            metadata: `${payment.metadata}`,
        })
    }
    async findByExternalId(externalId: string): Promise<Payment | null> {
        const paymentDB = await this.prisma.payment.findUnique({
            where: { externalId }
        })

        if (!paymentDB) throw new NotFoundException(`Payment with externalId [${externalId}] not found`);

        return Payment.entityToPayment({
            ...paymentDB,
            amount: parseFloat(`${paymentDB.amount}`),
            metadata: `${paymentDB.metadata}`,
        });
    }

}