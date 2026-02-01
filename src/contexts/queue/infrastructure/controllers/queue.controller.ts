import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { JoinQueueUseCase } from '../../application/join-queue.use-case/join-queue.use-case';
import { GrantAccessUseCase } from '../../application/grant-access-use-case/grant-access-use-case';
import { CheckAccessUseCase } from '../../application/check-access-use-case/check-access-use-case';

@Controller('concerts')
export class QueueController {

    constructor(
        private readonly joinQueueUseCase: JoinQueueUseCase,
        private readonly grantAccessUseCase: GrantAccessUseCase,
        private readonly checkAccessUseCase: CheckAccessUseCase,
    ) { }

    @Get(':concertId/access')
    checkAccess(@Param('concertId') concertId: string, @Req() req) {
        const userId = req.user?.id ?? req.headers['x-user-id'];

        return this.checkAccessUseCase.execute(concertId, userId);
    }

    @Post(':concertId/queue')
    join(@Param('concertId') concertId: string, @Req() req) {
        const userId = req.user?.id ?? req.headers['x-user-id'];

        return this.joinQueueUseCase.execute(concertId, userId);
    }

    @Post(':concertId/grant')
    grantAcces(@Param('concertId') concertId: string, @Body('limit') limit: number) {
        return this.grantAccessUseCase.execute(concertId, limit);
    }

}