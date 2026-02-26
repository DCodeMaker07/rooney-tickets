import { PrimitiveUser, User } from "../entity/user";

interface SaveInput {
    email: string;
    password: string;
}

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<PrimitiveUser | null>;
    abstract findById(id: string): Promise<PrimitiveUser | null>;
    abstract save(input: SaveInput): Promise<PrimitiveUser>;
}