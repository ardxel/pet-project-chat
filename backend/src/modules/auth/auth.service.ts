import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from 'modules/auth/dto';
import { ConversationService } from 'modules/conversation';
import { HashService, UserService } from 'modules/user';
import { ContactService } from 'modules/user/contact.service';
import { UserDocument } from 'schemas';
import { JwtUserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private adminEmailSet: Set<string> = new Set(['admin@gmail.com']);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly conversationService: ConversationService,
    private readonly contactsService: ContactService,
  ) {}

  public async signUp(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;

    if (await this.userService.isExist({ email })) {
      throw new BadRequestException('this email is already taken');
    }

    if (await this.userService.isExist({ name })) {
      throw new BadRequestException('this name is already taken');
    }

    const encryptedPassword = await this.hashService.encryptPassword(password);

    const user = await this.userService.create({ email, name, password: encryptedPassword });
    const token = await this.jwtService.signAsync({ sub: user._id });

    const { password: unused, ...safeUser } = user.toJSON();

    await this.addAdminToContactAndChat(user);

    return { user: safeUser, token };
  }

  public async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email, { selectPassword: true });

    if (!user) {
      throw new BadRequestException('user with this email is not exist');
    }

    if (!(await this.hashService.comparePasswords(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = await this.jwtService.signAsync({ sub: user._id });

    const { password, ...safeUser } = user.toJSON();

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

  private async addAdminToContactAndChat(user: UserDocument) {
    if (this.adminEmailSet.has(user.email)) return;

    const admin = await this.userService.findByEmail('admin@gmail.com');

    await this.conversationService.create({ userIds: [admin.id, user.id] });
    await this.contactsService.addContact({ initiatorId: user.id, addedId: admin.id, returnUserAfter: false });
    await this.contactsService.addContact({ initiatorId: admin.id, addedId: user.id, returnUserAfter: false });
  }
}
