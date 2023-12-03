import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'common';
import { ResponseDataConversationMessages, ResponseDataNewConversation } from 'common/swagger';
import { CreateConversationDto, GetMessagesDto } from 'modules/conversation/dto';
import { ConversationService } from './conversation.service';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new conversation', description: 'create new conversation' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataNewConversation })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async create(@Body() dto: CreateConversationDto) {
    return await this.conversationService.create(dto);
  }

  @Get('messages')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get conversation messages',
    description: 'Get conversation messages by conversation Id and optional page',
  })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'success operation', type: ResponseDataConversationMessages })
  @ApiBadRequestResponse({ status: HttpStatus.NOT_FOUND, description: 'conversation not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User must be authenticated to perform this operation.',
  })
  async findMessages(@Body() dto: GetMessagesDto) {
    return await this.conversationService.findMessages(dto);
  }

  @ApiExcludeEndpoint()
  @Get('all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.conversationService.findAll();
  }
  @ApiExcludeEndpoint()
  @Delete('all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async deleteAll() {
    return await this.conversationService.deleteAll();
  }
}
