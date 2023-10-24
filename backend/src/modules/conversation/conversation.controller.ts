import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateConversationDto, GetMessagesDto } from 'modules/conversation/dto';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async create(@Body() dto: CreateConversationDto) {
    return await this.conversationService.create(dto);
  }

  @Get('messages')
  async findMessages(@Body() dto: GetMessagesDto) {
    return await this.conversationService.findMessages(dto);
  }

  @Get('all')
  async findAll() {
    return await this.conversationService.findAll();
  }

  @Get('delete')
  async deleteAll() {
    return await this.conversationService.deleteAll();
  }
}
