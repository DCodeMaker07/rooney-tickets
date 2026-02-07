import { Injectable } from "@/common/Injectable";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { OrderRepository } from "../../domain/order.repository";
import { CreateOrderInput } from "./create-order-input";
import { Order } from "../../domain/order";
import { OrderCreatedEvent } from "../../domain/order.event";

@Injectable()
export class CreateOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private eventEmitter: EventEmitter2,
    ) { }

    async execute(input: CreateOrderInput) {

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const order = new Order(input.userId, input.concertId, input.amount, 'PENDING', input.items, expiresAt);

        const createdOrder = await this.orderRepository.create(order);

        this.eventEmitter.emit('order.created', new OrderCreatedEvent(createdOrder.id!, createdOrder.amount, 'STRIPE', 'test', 'USD'));

        return createdOrder;

    }

}