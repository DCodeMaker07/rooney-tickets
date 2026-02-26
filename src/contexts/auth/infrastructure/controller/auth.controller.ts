import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserUseCase, RegisterUserUseCase } from "../../application";
import { SignInDto, SignUpDto } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(
        private loginUserUseCase: LoginUserUseCase,
        private registerUserUseCase: RegisterUserUseCase,
    ) { }

    @Post('signin')
    signin(@Body() signinDto: SignInDto) {
        return this.loginUserUseCase.execute(signinDto);
    }

    @Post('signup')
    signup(@Body() signUpDto: SignInDto) {
        return this.registerUserUseCase.execute(signUpDto);
    }

}