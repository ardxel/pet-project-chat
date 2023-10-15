import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common';
import { Request } from 'express';
import { UserService } from './user.service';

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

  @Get('test-guard')
  @UseGuards(JwtAuthGuard)
  public async testGuard(@Req() req: Request) {
    return req.user;
  }
}
