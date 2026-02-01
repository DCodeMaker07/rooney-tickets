import { Injectable } from "@/common/Injectable";
import { QueueRepository } from "../../domain/queue.repository";
import { GrantAccessResponse } from "./grant-access-response";

@Injectable()
export class GrantAccessUseCase {

    constructor(
        private readonly queueRepository: QueueRepository,
    ) { }

    async execute(concertId: string, limit: number): Promise<GrantAccessResponse> {
        const queueName = `concert:${concertId}`;
        const ttl = 8 * 60;

        const users = await this.queueRepository.popNext(queueName, limit);

        for (const userId of users) {
            await this.queueRepository.addActive(queueName, userId, ttl);
        }

        return { granted: users.length, users };
    }

}