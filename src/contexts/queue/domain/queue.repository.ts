export abstract class QueueRepository {
    abstract join(concertId: string, userId: string): Promise<number>;
    abstract getPosition(concertId: string, userId: string): Promise<number>;
}