import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderUseCase } from "../../application/create-order-use-case/create-order-use-case";
import { CreateOrderDto } from "./dtos/oders-dto";

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
    ) { }

    @Post('')
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.createOrderUseCase.execute(createOrderDto);
    }

}