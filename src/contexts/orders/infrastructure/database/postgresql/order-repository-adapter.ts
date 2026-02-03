import { Injectable } from "@/common/Injectable";
import { Order } from "@/contexts/orders/domain/order";
import { OrderRepository } from "@/contexts/orders/domain/order.repository";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class OrderRepositoryAdapter implements OrderRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(order: Order): Promise<Order> {
        const created = await this.prisma.order.create({
            data: {
                userId: order.userId,
                concertId: order.concertId,
                status: order.status,
                total: order.amount,
            }
        });
        
        return Order.entityToOrder({
            ...created,
            total: parseInt(`${created.total}`)
        });
    }
    async update(order: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }

}