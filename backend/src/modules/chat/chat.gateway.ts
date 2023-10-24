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
import { BaseWsExceptionFilter } from 'common/exceptions';
import { GetMessagesDto } from 'modules/conversation';
import { ConversationService } from 'modules/conversation/conversation.service';
import { CreateMessageDto } from 'modules/message/dto';
import { MessageService } from 'modules/message/message.service';
import { UserService } from 'modules/user';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { InviteUserDto } from './dto';

interface UserSocket extends Socket {
  user: User & { _id: Types.ObjectId };
}

enum ChatEvents {
  CONVERSATION_CREATE = 'conversation:create',
  CONVERSATION_UPDATE = 'conversation:update',
  MESSAGE_CREATE = 'message:create',
  MESSAGE_FETCH = 'message:fetch',
}

@WebSocketGateway({ namespace: 'chat' })
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
    try {
      await this.joinSocketToOwnRoomByMongoId(socket);
      await this.joinInAllConversationRooms(socket);
    } catch (error) {
      this.logger.error(error);
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: UserSocket) {
    // Этот метод вызывается, когда клиент отключается от сервера
    console.log(`Client ${socket.id} disconnected`);
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
      throw new WsException(error);
    }
  }

  @SubscribeMessage(ChatEvents.MESSAGE_FETCH)
  async onConversationPopulateMessages(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: GetMessagesDto) {
    try {
      dto.page = dto.page || 1;
      dto.limit = dto.limit || 25;

      if (await this.conversationService.isNotExist(dto.conversationId)) {
        throw new WsException('Conversation was no found');
      }

      const messages = await this.conversationService.findMessages(dto);
      socket.emit(ChatEvents.MESSAGE_FETCH, messages);
    } catch (error) {
      this.logger.error(error);
      throw new WsException(error);
    }
  }

  @SubscribeMessage(ChatEvents.MESSAGE_CREATE)
  async onMessageCreate(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: CreateMessageDto) {
    const { conversationId, sender, text } = dto;
    try {
      if (text.length === 0) {
        throw new WsException('The text must contain at least one character');
      }

      if (await this.conversationService.isNotExist(conversationId)) {
        throw new WsException('This conversation is not exist');
      }

      const message = await this.messageService.create(dto);
      this.server.in(dto.conversationId.toString()).emit(ChatEvents.MESSAGE_CREATE, message);
    } catch (error) {
      this.logger.error(error);
      throw new WsException(error);
    }
  }

  private async joinSocketToOwnRoomByMongoId(socket: UserSocket) {
    socket.user = await this.chatService.getUserFromSocket(socket);
    socket.join(socket.user._id.toString());
  }

  private async joinInAllConversationRooms(socket: UserSocket) {
    const conversations = await this.conversationService.findAllByUserId(socket.user._id);
    socket.join(conversations.map((conversation) => conversation._id.toString()));
    this.logger.log(`Connection established: ${socket.user.email}`);
  }
}
