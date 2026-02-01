import { Injectable } from "@/common/Injectable";
import { QueueRepository } from '../../domain/queue.repository';
import { CheckAccessResponse } from "./check-access-response";

@Injectable()
export class CheckAccessUseCase {

    constructor(
        private readonly queueRepository: QueueRepository,
    ) { }

    async execute(concertId: string, userId: string): Promise<CheckAccessResponse> {
        const queueName = `concert:${concertId}`;

        const hasAccess = await this.queueRepository.isActive(queueName, userId);

        return { hasAccess };
    }

}