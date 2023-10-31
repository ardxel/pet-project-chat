import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateConversationDto, GetMessagesDto } from 'modules/conversation/dto';
import { ConversationService } from './conversation.service';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateConversationDto) {
    return await this.conversationService.create(dto);
  }

  @Get('messages')
  @HttpCode(200)
  async findMessages(@Body() dto: GetMessagesDto) {
    return await this.conversationService.findMessages(dto);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.conversationService.findAll();
  }

  @Delete()
  @HttpCode(200)
  async deleteAll() {
    return await this.conversationService.deleteAll();
  }
}
