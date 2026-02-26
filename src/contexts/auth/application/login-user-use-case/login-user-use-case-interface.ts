export interface AuthInput {
    email       : string;
    password    : string;
}

export interface LoginUserUseCaseInterface {
    execute(input: AuthInput): Promise<{ userId: string, token: string }>;
}