import { Body, Controller, Param, Post, Req } from "@nestjs/common";
import { JoinQueueUseCase } from '../../application/join-queue.use-case/join-queue.use-case';
import { GrantAccessUseCase } from '../../application/grant-access-use-case/grant-access-use-case';

@Controller('concerts')
export class QueueController {

    constructor(
        private readonly joinQueueUseCase: JoinQueueUseCase,
        private readonly grantAccessUseCase: GrantAccessUseCase,
    ) { }

    @Post(':concertId/queue')
    async join(@Param('concertId') concertId: string, @Req() req) {
        const userId = req.user?.id ?? req.headers['x-user-id'];

        return this.joinQueueUseCase.execute(concertId, userId);
    }

    @Post(':concertId/grant')
    async grantAcces(@Param('concertId') concertId: string, @Body('limit') limit: number) {
        return this.grantAccessUseCase.execute(concertId, limit);
    }

}