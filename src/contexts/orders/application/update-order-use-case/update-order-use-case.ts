import { Injectable } from "@/common/Injectable";
import { OrderRepository } from "../../domain/order.repository";
import { UpdateOrderInput } from "./update-order-input";

@Injectable()
export class UpdateOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async execute(orderId: string) {

        return this.orderRepository.update({
            orderId,
            paidAt: new Date(),
            status: 'PAID'
        });
    }

}