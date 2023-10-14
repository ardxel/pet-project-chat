import { Controller, Get } from '@nestjs/common';
import { UserService } from './services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('clear-users')
  public async __clearUsers_unsafe() {
    return await this.userService.__deleteAllUsers();
  }
  @Get('count-users')
  public async countUsers() {
    return await this.userService.__getUserCount();
  }
}
