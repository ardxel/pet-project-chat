import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas';
import { ContactService } from './contact.service';
import { HashService } from './hash.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, HashService, ContactService],
  exports: [UserService, HashService],
})
export class UserModule {}
