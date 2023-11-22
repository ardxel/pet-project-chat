import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'common/guards';
import { ContactsResponseData } from 'common/swagger';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { ContactService } from './contact.service';
import { AddContactDto, DeleteContactDto, FindManyQueryDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly contactService: ContactService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users by query', description: 'get users' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation' })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid query params' })
  async findMany(@Query() query: FindManyQueryDto) {
    return await this.userService.findMany(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('contacts/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ type: String, name: 'id' })
  @ApiOperation({ summary: 'Get user contacts', description: 'get user contacts by user id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Get users contacts with populated user list',
    type: ContactsResponseData,
  })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid ID supplies' })
  async getContacts(@Param('id') id: Types.ObjectId): Promise<{ contacts: User[] }> {
    return await this.contactService.getUserContactsById(id);
  }

  @Post('contacts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Insert one contact', description: 'Insert one contact by id' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation' })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  async addContact(@Body() dto: AddContactDto) {
    return await this.contactService.addContact(dto);
  }

  @Delete('contacts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete contact', description: 'Delete contact by id' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation' })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  async deleteContact(@Body() dto: DeleteContactDto) {
    return await this.contactService.deleteContact(dto);
  }

  @Delete('all')
  @HttpCode(200)
  async deleteAll() {
    return await this.userService.deleteMany();
  }

  @Get('all')
  @HttpCode(200)
  async findAll() {
    return await this.userService.findAll();
  }
}
