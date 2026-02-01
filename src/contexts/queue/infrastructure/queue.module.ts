
import { Module } from '@nestjs/common';
import { RedisQueueRepositoryAdapter } from './redis/redis-queue.repository';
import { QueueController } from './controllers/queue.controller';
import { QueueRepository } from '../domain/queue.repository';
import { JoinQueueUseCase } from '../application/join-queue.use-case/join-queue.use-case';

@Module({
    controllers: [QueueController],
    providers: [
        RedisQueueRepositoryAdapter,
        JoinQueueUseCase,
        {
            provide: QueueRepository,
            useExisting: RedisQueueRepositoryAdapter,
        }
    ]
})
export class QueueModule { }