import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'common/guards';
import {
  ContactsResponseData,
  ResponseDataDeletedContact,
  ResponseDataManyUsers,
  ResponseDataNewContact,
  ResponseDataUpdatedUser,
} from 'common/swagger';
import { Express } from 'express';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { ContactService } from './contact.service';
import {
  AddContactDto,
  ChangeAvatarDto,
  ChangeConversationStatusDto,
  ChangePasswordDto,
  DeleteContactDto,
  FindManyQueryDto,
  UpdateUserDto,
} from './dto';
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
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataManyUsers })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid query param' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async findMany(@Query(new ValidationPipe({ transform: true })) query: FindManyQueryDto) {
    return await this.userService.findMany(query);
  }

  @Get('contacts/:id')
  @HttpCode(HttpStatus.OK)
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async getContacts(@Param('id') id: Types.ObjectId): Promise<{ contacts: User[] }> {
    return await this.contactService.getUserContactsById(id);
  }

  @Post('contacts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Insert one contact', description: 'Insert one contact by id' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataNewContact })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async addContact(@Body() dto: AddContactDto) {
    return await this.contactService.addContact(dto);
  }

  @Delete('contacts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete contact', description: 'Delete contact by id' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataDeletedContact })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async deleteContact(@Body() dto: DeleteContactDto) {
    return await this.contactService.deleteContact(dto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update user', description: 'update user' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataUpdatedUser })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid body values' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async update(@Body() dto: UpdateUserDto) {
    return await this.userService.update(dto);
  }

  @Put('password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'change user password',
    description: 'change user password, using checking the new password and validating the old one',
  })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation' })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid body values' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async changePassword(@Body() dto: ChangePasswordDto) {
    return await this.userService.changePassword(dto);
  }

  @Post('conversation/status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'change user conversation status',
    description: 'change user conversation and return updated json user document',
  })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataUpdatedUser })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, description: 'invalid new status' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async changeConversationStatus(@Body() dto: ChangeConversationStatusDto) {
    return await this.userService.changeConversationStatus(dto);
  }

  @Post('avatar')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({
    summary: 'Change user avatar',
    description: 'Change user avatar by uploading a new image.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ChangeAvatarDto, description: 'Data for changing the user avatar' })
  @ApiCreatedResponse({
    description: 'User avatar changed successfully.',
    type: ResponseDataUpdatedUser,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request or file type. Check the request parameters.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async changeAvatar(
    @Body() dto: ChangeAvatarDto,
    @UploadedFile(new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: 'image' })] }))
    file: Express.Multer.File,
  ) {
    return await this.userService.changeAvatar(dto, file);
  }

  @ApiExcludeEndpoint()
  @Delete('all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async deleteAll() {
    return await this.userService.deleteMany();
  }

  @ApiExcludeEndpoint()
  @Get('all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.userService.findAll();
  }
}
