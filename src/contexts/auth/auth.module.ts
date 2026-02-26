import { envs } from '@/config/envs';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginUserUseCase, RegisterUserUseCase } from './application';
import { PasswordHashPort, TokenGeneratorPort, UserRepository } from './domain/repository';
import { AuthController } from './infrastructure/controller/auth.controller';
import { UserRepositoryAdapter } from './infrastructure/database/postgres/user-repository-adapter';
import { PasswordHashAdapter } from './infrastructure/bcrypt/password-hash.adapter';
import { JwtTokenGeneratorAdapter } from './infrastructure/jwt/token-generator.adapter';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            global: true,
            secret: envs.jwtSecret,
            signOptions: { expiresIn: '60s' }
        }),
    ],
    providers: [
        PrismaService,
        LoginUserUseCase,
        RegisterUserUseCase,
        UserRepositoryAdapter,
        PasswordHashAdapter,
        JwtTokenGeneratorAdapter,
        {
            provide: UserRepository,
            useClass: UserRepositoryAdapter
        },
        {
            provide: PasswordHashPort,
            useClass: PasswordHashAdapter,
        },
        {
            provide: TokenGeneratorPort,
            useClass: JwtTokenGeneratorAdapter,
        }
    ]
})
export class AuthModule { }