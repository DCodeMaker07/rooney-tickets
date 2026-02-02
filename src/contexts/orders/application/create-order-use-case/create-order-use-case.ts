import { Injectable } from "@/common/Injectable";
import { OrderRepository } from "../../domain/order.repository";
import { CreateOrderInput } from "./create-order-input";
import { Order } from "../../domain/order";

@Injectable()
export class CreateOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async execute(input: CreateOrderInput) {

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const order = new Order(input.userId, input.concertId, input.total, 'PENDING', expiresAt);

        const createdOrder = await this.orderRepository.create(order);

    }

}