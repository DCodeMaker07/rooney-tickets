import { Injectable } from "@/common/Injectable";
import { PrimitiveUser } from "@/contexts/auth/domain/entity/user";
import { UserRepository } from "@/contexts/auth/domain/repository/user-repository";
import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UserWrapper } from "./user-wrapper";

interface SaveInput {
    email: string;
    password: string;
}

@Injectable()
export class UserRepositoryAdapter implements UserRepository {

    #prisma: PrismaService;

    constructor(prismaService: PrismaService) {
        this.#prisma = prismaService;
    }

    async findByEmail(email: string): Promise<PrimitiveUser | null> {
        
        const userDB = await this.#prisma.user.findFirst({
            where: { email },
        });

        if (!userDB) throw new NotFoundException(`User with email [${email}] not exist`);

        return UserWrapper.toDomain({
            id: userDB.id,
            email: userDB.email!,
            password: userDB.password!,
            roles: userDB.roles!,
            isActive: userDB.isActive!,
            createdAt: userDB.createdAt,
            updatedAt: userDB.updatedAt,
        });
    }

    async findById(id: string): Promise<PrimitiveUser | null> {
        const userDB = await this.#prisma.user.findFirst({
            where: { id },
            omit: {
                password: true,
            }
        });

        if (!userDB) throw new NotFoundException(`User with id [${id}] not found`);

        return UserWrapper.toDomain({
            id: userDB.id,
            email: userDB.email!,
            password: '',
            roles: userDB.roles!,
            isActive: userDB.isActive!,
            createdAt: userDB.createdAt,
            updatedAt: userDB.updatedAt,
        })
    }

    async save(signUpInput: SaveInput): Promise<PrimitiveUser> {
        
        console.info(`[saveMethod]: called`)

        const { email, password } = signUpInput;

        const userDB = await this.#prisma.user.findFirst({
            where: { email }
        })

        if (userDB) throw new BadRequestException(`User [${email}] already exist`);

        const userCreated = await this.#prisma.user.create({
            data: {
                email,
                password,
            },
            omit: {
                password: true
            }
        });

        console.log(userCreated);

        return UserWrapper.toDomain({
            id: userCreated.id,
            email: userCreated.email!,
            password: '',
            roles: userCreated.roles!,
            isActive: userCreated.isActive!,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt,
        })
    }

}