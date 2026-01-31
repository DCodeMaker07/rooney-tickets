import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "@/config/envs";
import { PrismaClient } from "./generated/client";

@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        const adapter = new PrismaPg({
            connectionString: envs.databaseUrl,
        });
        super({ adapter });
    }

}