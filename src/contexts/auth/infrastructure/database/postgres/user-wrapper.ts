import { PrimitiveUser } from '@/contexts/auth/domain/entity/user';

export class UserWrapper {

    static toDomain(userEntity: {
        id: string,
        email: string,
        password: string,
        roles: string[],
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
        
    }): PrimitiveUser {
        return { ...userEntity }
    }

}