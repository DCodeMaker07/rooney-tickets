import { Injectable } from "@/common/Injectable";
import { JwtService } from '@nestjs/jwt';
import { TokenGeneratorPort } from "../../domain/repository/token-generator.port";

@Injectable()
export class JwtTokenGeneratorAdapter implements TokenGeneratorPort {

    #jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.#jwtService = jwtService;
    }

    async sign(payload: any): Promise<string> {
        return await this.#jwtService.signAsync(payload);
    }

    async verify<T>(token: string): Promise<T> {
        return await this.#jwtService.verifyAsync(token) as T;
    }

}