import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schemas';
import { HashService, UserService } from './services';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService, HashService],
})
export class UserModule {}
