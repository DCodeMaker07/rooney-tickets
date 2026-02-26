export abstract class TokenGeneratorPort {

    abstract sign(payload: any): Promise<string>;
    abstract verify<T>(token: string): Promise<T>;

}