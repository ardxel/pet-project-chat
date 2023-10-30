import { Logger, UnauthorizedException, UseFilters } from '@nestjs/common';
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
import { ConversationService, GetMessagesDto } from 'modules/conversation';
import { CreateMessageDto, MessageService } from 'modules/message';
import { UserService } from 'modules/user';
import { User } from 'schemas';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { InviteUserDto } from './dto';

interface UserSocket extends Socket {
  user: User;
}

enum ChatEvents {
  USER_INIT = 'user:init',
  CONVERSATION_CREATE = 'conversation:create',
  CONVERSATION_FETCH = 'conversation:fetch',
  MESSAGE_CREATE = 'message:create',
  MESSAGE_FETCH = 'message:fetch',
}

enum ChatClientErrorEvents {
  CONVERSATION_CREATE = 'error:conversation-create',
  MESSAGE_CREATE = 'error:message-create',
  MESSAGE_FETCH = 'error:message-fetch',
  INVALID_TOKEN = 'error:invalid-token',
}

new UnauthorizedException();
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
    try {
      await this.authenticateUserBySocket(socket)
        .then(() => this.joinToOwnRoomByMongoId(socket))
        .then(() => this.joinInAllConversationRooms(socket))
        .then(() => this.sendUserData(socket));
    } catch (error) {
      if (error instanceof WsExceptionWithEvent) {
        socket.emit(error.exceptionEvent, error.message);
      }
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

      if (await this.conversationService.isNotExist(dto.conversationId)) {
        throw new WsException('Conversation was no found');
      }

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

      if (await this.conversationService.isNotExist(conversationId)) {
        throw new WsException('This conversation is not exist');
      }

      const message = await this.messageService.create(dto);
      this.server.in(dto.conversationId.toString()).emit(ChatEvents.MESSAGE_CREATE, { conversationId, message });
    } catch (error) {
      this.logger.error(error);
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.MESSAGE_CREATE);
    }
  }

  public async authenticateUserBySocket(socket: UserSocket) {
    const user = await this.chatService.getUserFromSocket(socket);
    if (!user) {
      throw new WsExceptionWithEvent('Token is invalid', ChatClientErrorEvents.INVALID_TOKEN);
    }
    socket.user = user;
  }

  private async joinToOwnRoomByMongoId(socket: UserSocket) {
    socket.join(socket.user._id.toString());
  }

  private async joinInAllConversationRooms(socket: UserSocket) {
    const conversations = await this.conversationService.findAllByUserId(socket.user._id);
    socket.join(conversations.map((conversation) => conversation._id.toString()));
    this.logger.log(`Connection established: ${socket.user.email}`);
  }

  private async sendUserData(socket: UserSocket) {
    this.server.in(socket.id).emit(ChatEvents.USER_INIT, socket.user);
  }
}
