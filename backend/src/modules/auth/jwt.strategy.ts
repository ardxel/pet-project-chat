import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'modules/user/services';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'schemas';

interface JwtUserPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Record<string, any> & JwtUserPayload): Promise<UserDocument> {
    const user = await this.userService.readById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
