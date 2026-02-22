import { Body, Controller, Post } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateOrderDto } from "./dtos/oders-dto";
import { CreateOrderUseCase, UpdateOrderUseCase } from "../../application";
import { UpdateOrderDto } from "./dtos";

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly updateOrderUseCase: UpdateOrderUseCase,
    ) { }

    @Post('')
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.createOrderUseCase.execute(createOrderDto);
    }

    @OnEvent('update.order.payment.paid')
    updateOrder(updateOrderDto: UpdateOrderDto) {
        return this.updateOrderUseCase.execute(updateOrderDto.orderId);
    }

}