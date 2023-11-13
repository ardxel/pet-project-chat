import { Injectable, Logger } from '@nestjs/common';
import { ConnectedSocket } from '@nestjs/websockets';
import { WsExceptionWithEvent } from 'common/exceptions';
import { UserSocket } from 'common/interfaces';
import { AuthService } from 'modules/auth';
import { ConversationService } from 'modules/conversation';
import { User, UserStatus } from 'schemas';
import { Socket } from 'socket.io';
import { ChatClientErrorEvents, ChatEvents } from './chat-events.enum';

@Injectable()
export class ChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    private readonly authService: AuthService,
    private readonly conversationService: ConversationService,
  ) {}

  async handleConnection(@ConnectedSocket() socket: UserSocket) {
    try {
      await this.authenticateUserBySocket(socket);
      await this.joinToOwnRoomByMongoDBId(socket);
      await this.joinInAllConversationRooms(socket);
      await this.sendUserData(socket);
      await this.sendUserStatusToAllRooms(socket, 'online');
      await this.getUserStatusesFromEachSocketConversation(socket);
    } catch (error) {
      if (error instanceof WsExceptionWithEvent) {
        socket.emit(error.exceptionEvent, error.message);
      }
      this.logger.error(error);
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: UserSocket) {
    this.sendUserStatusToAllRooms(socket, 'offline');
    this.logger.log(`Client ${socket.id} disconnected`);
  }

  async getUserStatusesFromEachSocketConversation(socket: UserSocket) {
    const conversationIds = socket.data.user.conversations.map((conversation) => String(conversation.data._id));

    await Promise.all(
      conversationIds.map(async (conversationId) => {
        const userIds = (await socket.broadcast.in(conversationId).fetchSockets()).map(
          (socket) => (socket.data.user as User)._id,
        );

        await Promise.all(
          userIds.map(async (userId) => {
            await new Promise((resolve) => {
              // Имитация асинхронной операции
              setTimeout(() => {
                socket.emit(ChatEvents.USER_STATUS, { userId, conversationId, status: 'online' });
                resolve(void 1);
              }, 0);
            });
          }),
        );
      }),
    );
  }

  async getUserFromSocket(socket: Socket) {
    let jwtToken: string;
    if (socket.handshake.headers.authorization) {
      const authHeader = socket.handshake.headers.authorization.split(' ');
      if (authHeader.length === 2) {
        jwtToken = authHeader[1];
      }
    }

    if (!jwtToken) {
      return undefined;
    }

    return await this.authService.getUserFromAccessToken(jwtToken);
  }

  private async authenticateUserBySocket(socket: Socket) {
    const user = await this.getUserFromSocket(socket);
    if (!user) {
      throw new WsExceptionWithEvent('Token is invalid', ChatClientErrorEvents.INVALID_TOKEN);
    }
    (socket as UserSocket).data.user = user;
  }

  private async joinToOwnRoomByMongoDBId(socket: UserSocket) {
    socket.join(String(socket.data.user._id));
  }

  private async joinInAllConversationRooms(socket: UserSocket) {
    const conversations = await this.conversationService.findAllByUserId(socket.data.user._id);
    const conversationIdList = conversations.map(({ data }) => String(data._id));
    socket.join(conversationIdList);
    this.logger.log(`Connection established: ${socket.data.user.email}`);
  }

  private async sendUserData(socket: UserSocket) {
    socket.emit(ChatEvents.USER_INIT, socket.data.user);
  }

  private async sendUserStatusToAllRooms(socket: UserSocket, status: UserStatus) {
    for (const conversation of socket.data.user.conversations) {
      const conversationId = String(conversation.data._id);
      socket.broadcast.to(conversationId).emit(ChatEvents.USER_STATUS, {
        userId: socket.data.user._id,
        conversationId,
        status: status,
      });
    }
  }
}
