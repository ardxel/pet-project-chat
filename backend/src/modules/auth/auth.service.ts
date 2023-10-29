import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from 'modules/auth/dto';
import { HashService, UserService } from 'modules/user';
import { JwtUserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  public async signUp(registerUserDto: RegisterUserDto) {
    if (await this.userService.isExist({ email: registerUserDto.email })) {
      throw new BadRequestException('this email is already taken');
    }

    registerUserDto.password = await this.hashService.encryptPassword(registerUserDto.password);

    const user = await this.userService.create(registerUserDto);
    const token = await this.jwtService.signAsync({ sub: user._id });

    return { user, token };
  }

  public async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email, true);

    if (!user) {
      throw new BadRequestException('user with this email is not exist');
    }

    if (!(await this.hashService.comparePasswords(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    const safeUser = this.userService.getSafeCopy(user);
    const token = await this.jwtService.signAsync({ sub: user._id });

    return { user: safeUser, token };
  }

  public async getUserFromAccessToken(token: string) {
    try {
      const payload: JwtUserPayload = await this.jwtService.verifyAsync(token);
      if (!payload) {
        return undefined;
      }
      return await this.userService.findById(payload.sub);
    } catch (error) {
      return undefined;
    }
  }
}
