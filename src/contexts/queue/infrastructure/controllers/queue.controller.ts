import { Controller, Param, Post, Req } from "@nestjs/common";
import { JoinQueueUseCase } from '../../application/join-queue.use-case/join-queue.use-case';

@Controller('concerts')
export class QueueController {

    constructor(
        private readonly joinQueueUseCase: JoinQueueUseCase
    ) { }

    @Post(':concertId/queue')
    async join(@Param('concertId') concertId: string, @Req() req) {
        const userId = req.user?.id ?? req.headers['x-user-id'];

        return this.joinQueueUseCase.execute(concertId, userId);
    }

}