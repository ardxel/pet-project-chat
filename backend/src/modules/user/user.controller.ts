import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { UserService } from './user.service';
import { UserTestService } from './userTest.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userTestService: UserTestService,
  ) {}

  @HttpCode(201)
  @Get(':id/contacts')
  @ApiParam({ type: String, name: 'id' })
  @ApiOperation({ summary: 'Get user contacts', description: 'get user contacts by user id' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation' })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid ID supplies' })
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
