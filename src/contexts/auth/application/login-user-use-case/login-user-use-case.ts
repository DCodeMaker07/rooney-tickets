import { Injectable } from "@/common/Injectable";
import { BadRequestException } from "@nestjs/common";
import { PasswordHashPort, TokenGeneratorPort, UserRepository } from "../../domain/repository";
import { AuthInput, LoginUserUseCaseInterface } from "./login-user-use-case-interface";

@Injectable()
export class LoginUserUseCase implements LoginUserUseCaseInterface {

    #userRepository: UserRepository;
    #hasher: PasswordHashPort;
    #tokenGenerator: TokenGeneratorPort;

    constructor(userRepository: UserRepository, hasher: PasswordHashPort, tokenGenerator: TokenGeneratorPort) {
        this.#userRepository = userRepository;
        this.#hasher = hasher;
        this.#tokenGenerator = tokenGenerator;
    }

    async execute(input: AuthInput): Promise<{userId: string, token: string}> {

        const { email, password } = input;

        const user = await this.#userRepository.findByEmail(email);

        const valid = await this.#hasher.compare(password, user?.password!);

        if(!valid) throw new BadRequestException(`Invalid credentials`);

        const token = await this.#tokenGenerator.sign({ sub: user?.id });

        return {
            userId: user?.id!,
            token,
        }

    }

}