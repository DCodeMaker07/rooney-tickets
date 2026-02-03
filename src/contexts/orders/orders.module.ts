
import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateOrderUseCase } from './application/create-order-use-case/create-order-use-case';
import { OrderRepository } from './domain/order.repository';
import { OrderRepositoryAdapter } from './infrastructure/database/postgresql/order-repository-adapter';
import { OrdersController } from './infrastructure/controller/orders.controller';

@Module({
    controllers: [OrdersController],
    imports: [],
    providers: [
        PrismaService,
        CreateOrderUseCase,
        OrderRepositoryAdapter,
        {
            provide: OrderRepository,
            useExisting: OrderRepositoryAdapter,
        }
    ]
})
export class OrdersModule { }