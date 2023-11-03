import { Controller, Delete, Get, HttpCode, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { DeleteMessageDto } from './dto';
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

  @Put()
  @HttpCode(200)
  async update() {}

  @Delete()
  @HttpCode(200)
  async delete(dto: DeleteMessageDto) {
    return await this.messageService.delete(dto);
  }

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
}
