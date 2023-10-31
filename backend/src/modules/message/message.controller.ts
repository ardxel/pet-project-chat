import { Controller, Delete, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.messageService.findById(id);
  }

  @Get('all')
  @HttpCode(200)
  async getAll() {
    return await this.messageService.findAll();
  }

  @Delete()
  @HttpCode(200)
  async deleteAll() {
    return await this.messageService.deleteAll();
  }
}
