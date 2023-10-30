import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  async getById(@Param('id') id: Types.ObjectId) {
    return await this.messageService.findById(id);
  }

  @Get('all')
  async getAll() {
    return await this.messageService.findAll();
  }

  @Delete()
  async deleteAll() {
    return await this.messageService.deleteAll();
  }
}
