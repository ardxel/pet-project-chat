import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { UserService } from './user.service';
import { UserTestService } from './userTest.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userTestService: UserTestService,
  ) {}

  @Get(':id/contacts')
  async getContacts(@Param('id') id: Types.ObjectId): Promise<{ contacts: User[] }> {
    return await this.userService.getUserContactsById(id);
  }

  @Get('clear-users')
  async clearAll() {
    return await this.userTestService.deleteAll();
  }
  @Get('count-users')
  async countUsers() {
    return await this.userTestService.countUsers();
  }

  @Get('all-users')
  async findAll() {
    return await this.userTestService.findAll();
  }
  @Get('mock-docks/:count')
  async createDocuments(@Param('count') count: number) {
    await this.userTestService.createRandomMany(count);
    return { completed: true };
  }
}
