import { Module } from '@nestjs/common';
import { HashService, UserService } from './services';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
})
export class UserModule {}
