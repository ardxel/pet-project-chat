import { Logger, UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { BaseWsExceptionFilter, WsExceptionWithEvent } from 'common/exceptions';
import { UserSocket } from 'common/interfaces';
import { ConversationService, GetMessagesDto } from 'modules/conversation';
import { CreateMessageDto, DeleteMessageDto, MessageService, UpdateMessageDto } from 'modules/message';
import { UserService } from 'modules/user';
import { Server } from 'socket.io';
import { ChatClientErrorEvents, ChatEvents } from './chat-events.enum';
import { ChatService } from './chat.service';
import { InviteUserDto } from './dto';

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
@UseFilters(BaseWsExceptionFilter)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger('ChatGateway');

  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  afterInit() {
    this.logger.log('ChatGateway init');
  }

  async handleConnection(@ConnectedSocket() socket: UserSocket) {
    await this.chatService.handleConnection(socket, this.server);
  }

  async handleDisconnect(socket: UserSocket) {
    this.logger.log(`Client ${socket.id} disconnected`);
  }

  @SubscribeMessage(ChatEvents.CONVERSATION_CREATE)
  async onConversationCreate(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: InviteUserDto) {
    try {
      if (await this.userService.isNotExist({ _id: dto.invitedUserId })) {
        throw new WsException('User not found');
      }

      const newConversation = await this.conversationService.create({ userIds: [socket.user._id, dto.invitedUserId] });
      const conversationId = newConversation._id.toString();
      /**
       * Создаем новую комнату и отправляем оба сокета в новую комнату под названием id беседы.
       */
      socket.join(conversationId);
      this.server.in(dto.invitedUserId.toString()).socketsJoin(conversationId);
      /**
       * Отправляем новую беседу клиентам в только что созданной комнате.
       */
      this.server.in(conversationId).emit(ChatEvents.CONVERSATION_CREATE, newConversation);
    } catch (error) {
      this.logger.error(error);
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.CONVERSATION_CREATE);
    }
  }

  @SubscribeMessage(ChatEvents.CONVERSATION_FETCH)
  async onConversationFetch(@ConnectedSocket() socket: UserSocket) {
    const userId = socket.user._id;
    const conversations = await this.conversationService.findAllByUserId(userId);
    this.server.in(String(userId)).emit(ChatEvents.CONVERSATION_FETCH, conversations);
  }

  @SubscribeMessage(ChatEvents.MESSAGE_FETCH)
  async onFetchMessages(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: GetMessagesDto) {
    try {
      dto.page = dto.page || 1;
      dto.limit = dto.limit || 25;

      const messages = await this.conversationService.findMessages(dto);
      socket.emit(ChatEvents.MESSAGE_FETCH, { messages, conversationId: dto.conversationId });
    } catch (error) {
      this.logger.error(error);
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.MESSAGE_FETCH);
    }
  }

  @SubscribeMessage(ChatEvents.MESSAGE_CREATE)
  async onMessageCreate(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: CreateMessageDto) {
    const { conversationId, sender, text } = dto;
    try {
      if (text.length === 0) {
        throw new WsException('The text must contain at least one character');
      }

      const message = await this.messageService.create(dto);
      this.server.in(dto.conversationId.toString()).emit(ChatEvents.MESSAGE_CREATE, { conversationId, message });
    } catch (error) {
      this.logger.error(error);
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.MESSAGE_CREATE);
    }
  }

  @SubscribeMessage(ChatEvents.MESSAGE_UPDATE)
  async onMessageUpdate(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: UpdateMessageDto) {
    try {
      const updatedMessage = await this.messageService.update(dto);
      this.server.in(String(dto.conversationId)).emit(ChatEvents.MESSAGE_UPDATE, updatedMessage);
    } catch (error) {
      this.logger.error(error);
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.MESSAGE_CREATE);
    }
  }

  @SubscribeMessage(ChatEvents.MESSAGE_DELETE)
  async onMessageDelete(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: DeleteMessageDto) {
    try {
      await this.messageService.delete(dto);
      this.server.in(String(dto.conversationId)).emit(ChatEvents.MESSAGE_DELETE, dto);
    } catch (error) {
      this.logger.error(error);
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.MESSAGE_DELETE);
    }
  }
}
