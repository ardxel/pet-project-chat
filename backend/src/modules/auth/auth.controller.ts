import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseAuthData } from 'common/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register user', description: 'Create user' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Get created user and token',
    type: responseAuthData(),
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid request body' })
  public async signUp(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.signUp(registerUserDto);
  }

  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user', description: 'Sign in a user with email and password.' })
  @ApiOkResponse({
    status: 200,
    description: 'User successfully signed in.',
    type: responseAuthData(),
  })
  @ApiBadRequestResponse({ status: 401, description: 'Invalid email or password.' })
  @ApiBody({ type: LoginUserDto })
  public async signIn(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.signIn(loginUserDto);
  }
}
