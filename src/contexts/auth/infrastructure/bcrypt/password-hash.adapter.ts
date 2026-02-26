import * as bcrypt from 'bcrypt';
import { Injectable } from "@/common/Injectable";
import { PasswordHashPort } from "../../domain/repository/password-hash.port";

@Injectable()
export class PasswordHashAdapter implements PasswordHashPort {
    
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}