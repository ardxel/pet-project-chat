import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { B2Module } from 'modules/b2/b2.module';
import { User, UserSchema } from 'schemas';
import { ContactService } from './contact.service';
import { HashService } from './hash.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => B2Module)],
  controllers: [UserController],
  providers: [UserService, HashService, ContactService],
  exports: [UserService, HashService, ContactService],
})
export class UserModule {}
