import { Injectable } from "@nestjs/common";
import { QueueRepository } from '../../domain/queue.repository';
import { JoinQueueResponse } from "./response.interface";

@Injectable()
export class JoinQueueUseCase {

    constructor(
        private readonly queueRepository: QueueRepository
    ) { }

    async execute(concertId: string, userId: string): Promise<JoinQueueResponse> {

        const position = await this.queueRepository.join(concertId, userId);

        return {
            status: 'IN_QUEUE',
            position: position + 1,
        }

    }

}