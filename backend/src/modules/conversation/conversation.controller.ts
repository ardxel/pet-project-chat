import { Body, Controller, Delete, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'common';
import { CreateConversationDto, GetMessagesDto } from 'modules/conversation/dto';
import { ConversationService } from './conversation.service';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateConversationDto) {
    return await this.conversationService.create(dto);
  }

  @Get('messages')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findMessages(@Body() dto: GetMessagesDto) {
    return await this.conversationService.findMessages(dto);
  }

  @Get('all')
  @HttpCode(200)
  async findAll() {
    return await this.conversationService.findAll();
  }

  @Delete('all')
  @HttpCode(200)
  async deleteAll() {
    return await this.conversationService.deleteAll();
  }
}
