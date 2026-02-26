interface AuthInput {
    email       : string;
    password    : string;
}

export interface RegisterUserUseCaseInterface {
    execute(input: AuthInput): Promise<{ email: string, roles: string[], isActive: boolean, token: string }>
}