import Redis from 'ioredis'
import { Injectable } from "@/common/Injectable";
import { QueueRepository } from "../../domain/queue.repository";
import { envs } from '@/config/envs';

@Injectable()
export class RedisQueueRepositoryAdapter implements QueueRepository {
    
    private readonly redis: Redis;

    constructor() {
        this.redis = new Redis(envs.redisUrl);
    }

    async join(concertId: string, userId: string): Promise<number> {
        const score = Date.now();

        await this.redis.zadd(this.queueKey(concertId), score, userId);

        const position = await this.redis.zrank(this.queueKey(concertId), userId);

        return position ?? 0;
    }
    
    async getPosition(concertId: string, userId: string): Promise<number> {
        const position = await this.redis.zrank(this.queueKey(concertId), userId);

        return position ?? -1;
    }

    private queueKey(concertId: string) {
        return `queue:concert:${concertId}`;
    }

}