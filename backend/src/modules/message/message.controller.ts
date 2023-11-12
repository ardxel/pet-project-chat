import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'common';
import { MessageResponseData } from 'common/swagger';
import { Types } from 'mongoose';
import { DeleteMessageDto } from './dto';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('all')
  @HttpCode(200)
  async getAll() {
    return await this.messageService.findAll();
  }

  @Delete('all')
  @HttpCode(200)
  async deleteAll() {
    return await this.messageService.deleteAll();
  }

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
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.messageService.findById(id);
  }

  @Put()
  @HttpCode(200)
  async update() {}

  @Delete()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async delete(dto: DeleteMessageDto) {
    return await this.messageService.delete(dto);
  }
}
