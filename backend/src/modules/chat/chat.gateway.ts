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
import { ConversationService, ConversationStatus, GetMessagesDto } from 'modules/conversation';
import { CreateMessageDto, DeleteMessageDto, MessageService, UpdateMessageDto } from 'modules/message';
import { UserService } from 'modules/user';
import { Types } from 'mongoose';
import { Conversation, Message, User, UserStatus } from 'schemas';
import { Server } from 'socket.io';
import { ChatClientErrorEvents, ChatEvents } from './chat-events.enum';
import { ChatService } from './chat.service';
import { CallAnswerDto, CallEndDto, CallOfferDto, CallUpdateDto, InviteUserDto } from './dto';
import { ChangeUserStatusDto } from './dto/change-user-status.dto';

type EventData<T> = (data: T) => void;

// prettier-ignore
interface ClientToServerEvents {
  [ChatEvents.USER_STATUS]: EventData<{userId: Types.ObjectId; conversationId: Types.ObjectId; status: UserStatus;}>;
}

// prettier-ignore
interface ServerToClientEvents {
  [ChatClientErrorEvents.INVALID_TOKEN]: EventData<{message: string; status: string; stack?: any}>;
  [ChatEvents.USER_INIT]:                EventData<User>;
  [ChatEvents.USER_STATUS]:              EventData<{userId: Types.ObjectId; conversationId: Types.ObjectId; status: UserStatus}>;
  
  [ChatEvents.CONVERSATION_CREATE]:      EventData<Conversation>;
  [ChatEvents.CONVERSATION_FETCH]:       EventData<{ data: Conversation; status: ConversationStatus }[]>;

  [ChatEvents.MESSAGE_FETCH]:            EventData<{ conversationId: Types.ObjectId; messages: Message[] }>;
  [ChatEvents.MESSAGE_CREATE]:           EventData<{ conversationId: Types.ObjectId; message: Message }>;
  [ChatEvents.MESSAGE_UPDATE]:           EventData<Message>;
  [ChatEvents.MESSAGE_DELETE]:           EventData<DeleteMessageDto>;
  
  [ChatEvents.CALL_OFFER]:               EventData<CallOfferDto>;
  [ChatEvents.CALL_ANSWER]:              EventData<Omit<CallAnswerDto, 'to'>>;
  [ChatEvents.CALL_END]:                 EventData<CallEndDto>;
  [ChatEvents.CALL_UPDATE]:              EventData<CallUpdateDto>;
}

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
@UseFilters(BaseWsExceptionFilter)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  private readonly server: Server<ClientToServerEvents, ServerToClientEvents, {}, { user: User }>;
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
    await this.chatService.handleConnection(socket);
  }

  async handleDisconnect(socket: UserSocket) {
    await this.chatService.handleDisconnect(socket);
  }

  @SubscribeMessage(ChatEvents.USER_STATUS)
  async onChangeUserStatus(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: ChangeUserStatusDto) {
    this.server.to(String(dto.conversationId)).emit(ChatEvents.USER_STATUS, dto);
  }

  @SubscribeMessage(ChatEvents.CONVERSATION_CREATE)
  async onConversationCreate(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: InviteUserDto) {
    try {
      if (await this.userService.isNotExist({ _id: dto.invitedUserId })) {
        throw new WsException('User not found');
      }

      const newConversation = await this.conversationService.create({
        userIds: [socket.data.user._id, dto.invitedUserId],
      });
      const conversationId = newConversation._id.toString();
      /**
       * Создаем новую комнату и отправляем оба сокета в новую комнату под названием id беседы.
       */
      socket.join(conversationId);
      this.server.in(String(dto.invitedUserId)).socketsJoin(conversationId);
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
    const userId = socket.data.user._id;
    const conversations = await this.conversationService.findAllByUserId(userId);
    this.server.in(String(userId)).emit(ChatEvents.CONVERSATION_FETCH, conversations);
  }

  @SubscribeMessage(ChatEvents.MESSAGE_FETCH)
  async onFetchMessages(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: GetMessagesDto) {
    try {
      dto.page = dto.page || 1;

      const messages = await this.conversationService.findMessages(dto);
      this.server
        .in(String(socket.data.user._id))
        .emit(ChatEvents.MESSAGE_FETCH, { messages, conversationId: dto.conversationId });
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

      const message = (await this.messageService.create(dto)) as Message;
      this.server.in(String(dto.conversationId)).emit(ChatEvents.MESSAGE_CREATE, { conversationId, message });
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
      throw new WsExceptionWithEvent(error, ChatClientErrorEvents.MESSAGE_UPDATE);
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

  @SubscribeMessage(ChatEvents.CALL_OFFER)
  async onCallOffer(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: CallOfferDto) {
    console.log(ChatEvents.CALL_OFFER);
    this.server.to(String(dto.to)).emit(ChatEvents.CALL_OFFER, dto);
  }

  @SubscribeMessage(ChatEvents.CALL_ANSWER)
  async onCallAnswer(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: CallAnswerDto) {
    console.log(ChatEvents.CALL_ANSWER);
    if (dto.verdict === 'accept') {
      socket.data.lastCallWith = dto.to;
    }
    this.server.to(String(dto.to)).emit(ChatEvents.CALL_ANSWER, { signal: dto.signal, verdict: dto.verdict });
  }

  @SubscribeMessage(ChatEvents.CALL_UPDATE)
  async onCallupdate(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: CallUpdateDto) {
    console.log(ChatEvents.CALL_UPDATE);
    this.server.to(String(dto.to)).emit(ChatEvents.CALL_UPDATE, dto);
  }

  @SubscribeMessage(ChatEvents.CALL_END)
  async onCallEnd(@ConnectedSocket() socket: UserSocket, @MessageBody() dto: CallEndDto) {
    console.log(ChatEvents.CALL_END);
    socket.to(String(dto.to)).emit(ChatEvents.CALL_END);
    socket.data.lastCallWith = null;

    const callMessage = await this.messageService.createCallMessage(dto);

    this.server
      .in(String(callMessage.conversationId))
      .emit(ChatEvents.MESSAGE_CREATE, { conversationId: callMessage.conversationId, message: callMessage });
  }
}
