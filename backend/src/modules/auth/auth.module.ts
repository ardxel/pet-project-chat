import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'modules/user';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET');
        const signOptions = {
          expiresIn: configService.get('JWT_LIFETIME'),
        };
        console.log(secret, signOptions);
        return { secret, signOptions };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
