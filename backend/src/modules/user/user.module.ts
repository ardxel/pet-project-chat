import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas';
import { HashService } from './hash.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserTestService } from './userTest.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, HashService, UserTestService],
  exports: [UserService, HashService],
})
export class UserModule {}
