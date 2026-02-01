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

    async popNext(queueName: string, limit: number): Promise<string[]> {

        const key = `queue:${queueName}`;

        const result = await this.redis.zpopmin(key, limit);

        return result.filter((_, index) => index % 2 === 0);

    }
    async addActive(queueName: string, userId: string, ttlSeconds: number): Promise<void> {
        const key = `active:${queueName}`;

        await this.redis.sadd(key, userId);
        await this.redis.expire(key, ttlSeconds);
    }

    private queueKey(concertId: string) {
        return `queue:concert:${concertId}`;
    }

}