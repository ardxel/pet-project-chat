import { Controller, Delete, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'common';
import { MessageResponseData, ResponseDataDeletedMessage } from 'common/swagger';
import { Types } from 'mongoose';
import { DeleteMessageDto } from './dto';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(`:id`)
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiParam({ type: String, name: 'id' })
  @ApiOperation({ summary: 'get message by id', description: 'get message by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'success operation',
    type: MessageResponseData,
  })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'message not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.messageService.findById(id);
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiParam({ type: String, name: 'id' })
  @ApiOperation({ summary: 'delete message', description: 'delete message by id and conversation id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'success operation',
    type: ResponseDataDeletedMessage,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async delete(dto: DeleteMessageDto) {
    return await this.messageService.delete(dto);
  }

  @ApiExcludeEndpoint()
  @Get('all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.messageService.findAll();
  }

  @ApiExcludeEndpoint()
  @Delete('all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async deleteAll() {
    return await this.messageService.deleteAll();
  }
}
