import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  @HttpCode(201)
  public async signUp(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.signUp(registerUserDto);
  }
  @Post('sign-in')
  @HttpCode(200)
  public async signIn(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.signIn(loginUserDto);
  }
}
