import { Injectable } from "@/common/Injectable";
import { RegisterUserUseCaseInterface } from "./register-user-use-case-interface";
import { PasswordHashPort, TokenGeneratorPort, UserRepository } from "../../domain/repository";

interface AuthInput {
    email       : string;
    password    : string;
}

@Injectable()
export class RegisterUserUseCase implements RegisterUserUseCaseInterface {

    #userRepository: UserRepository;
    #hasher: PasswordHashPort;
    #tokenGenerator: TokenGeneratorPort;

    constructor(userRepository: UserRepository, hasher: PasswordHashPort, tokenGenerator: TokenGeneratorPort) {
        this.#userRepository = userRepository;
        this.#hasher = hasher;
        this.#tokenGenerator = tokenGenerator;
    }

    async execute(input: AuthInput): Promise<{ email: string, roles: string[], isActive: boolean, token: string }> {

        const { email, password } = input;

        const userDB = await this.#userRepository.save({
            email,
            password: await this.#hasher.hash(password),
        });

        return {
            email: userDB.email,
            isActive: userDB.isActive,
            roles: userDB.roles,
            token: await this.#tokenGenerator.sign({ sub: userDB.id })
        }
    }

}