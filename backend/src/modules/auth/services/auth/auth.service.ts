import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from 'modules/auth/dto';
import { HashService, UserService } from 'modules/user/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  public async signUp(registerUserDto: RegisterUserDto) {
    if (await this.userService.isUserExist(registerUserDto.email)) {
      throw new BadRequestException('this email is already taken');
    }
    const user = await this.userService.create(registerUserDto, true);
    const token = await this.jwtService.signAsync({ email: user.email });
    return { user, token };
  }

  public async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.readByEmail(loginUserDto.email);

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
}
