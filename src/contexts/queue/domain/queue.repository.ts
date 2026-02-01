export abstract class QueueRepository {
    abstract join(concertId: string, userId: string): Promise<number>;
    abstract getPosition(concertId: string, userId: string): Promise<number>;

    abstract popNext(queueName: string, limit: number): Promise<string[]>;
    abstract addActive(queueName: string, userId: string, ttlSeconds: number): Promise<void>;

    abstract isActive(queueName: string, userId: string): Promise<boolean>;
}