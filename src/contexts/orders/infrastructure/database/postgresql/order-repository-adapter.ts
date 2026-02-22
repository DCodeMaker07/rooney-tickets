import { Injectable } from "@/common/Injectable";
import { UpdateOrderInput } from "@/contexts/orders/application/update-order-use-case/update-order-input";
import { Order } from "@/contexts/orders/domain/order";
import { OrderRepository } from "@/contexts/orders/domain/order.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class OrderRepositoryAdapter implements OrderRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(order: Order): Promise<Order> {

        const seatsId = order.items.map((item) => {
            return item.seatId
        });

        const seats = await this.prisma.seat.findMany({
            where: {
                id: { in: seatsId },
            }
        });
        
        if(seats.length === 0) throw new NotFoundException(`Invalid seats`);
        
        const created = await this.prisma.order.create({
            data: {
                userId: order.userId,
                concertId: order.concertId,
                status: order.status,
                total: order.total,
                orderItem: {
                    createMany: {
                        data: order.items.map((item) => ({
                            price: item.price,
                            seatId: item.seatId,
                        }))
                    }
                }
            },
            include: {
                orderItem: {
                    select: {
                        id: true,
                        price: true,
                        seatId: true,
                    }
                }
            }
        });

        return Order.entityToOrder({
            ...created,
            total: parseInt(`${created.total}`),
            items: created.orderItem.map((u) => ({
                id: u.id,
                price: parseInt(`${u.price}`),
                seatId: u.seatId,
            }))
        });

    }
    async update(order: UpdateOrderInput): Promise<void> {

        const orderDB = await this.findOne(order.orderId);

        if(!orderDB) throw new NotFoundException(`Order with id: [${order.orderId}] not found`);

        await this.prisma.order.update({
            where: { id: order.orderId },
            data: {
                status: order.status,
                paidAt: order.paidAt,
            }
        });

    }

    async findById(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }

    private async findOne(orderId: string) {

        return await this.prisma.order.findFirst({
            where: {
                id: orderId
            }
        })

    }

}