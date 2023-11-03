import { Injectable, Logger } from '@nestjs/common';
import { ConnectedSocket } from '@nestjs/websockets';
import { WsExceptionWithEvent } from 'common/exceptions';
import { UserSocket } from 'common/interfaces';
import { AuthService } from 'modules/auth';
import { ConversationService } from 'modules/conversation';
import { Server, Socket } from 'socket.io';
import { ChatClientErrorEvents, ChatEvents } from './chat-events.enum';

@Injectable()
export class ChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    private readonly authService: AuthService,
    private readonly conversationService: ConversationService,
  ) {}

  async handleConnection(@ConnectedSocket() socket: UserSocket, server: Server) {
    try {
      await this.authenticateUserBySocket(socket)
        .then(() => this.joinToOwnRoomByMongoId(socket))
        .then(() => this.joinInAllConversationRooms(socket))
        .then(() => this.sendUserData(socket, server));
    } catch (error) {
      if (error instanceof WsExceptionWithEvent) {
        socket.emit(error.exceptionEvent, error.message);
      }
      this.logger.error(error);
      socket.disconnect();
    }
  }

  private async authenticateUserBySocket(socket: Socket) {
    const user = await this.getUserFromSocket(socket);
    if (!user) {
      throw new WsExceptionWithEvent('Token is invalid', ChatClientErrorEvents.INVALID_TOKEN);
    }
    (socket as UserSocket).user = user;
  }

  private async joinToOwnRoomByMongoId(socket: UserSocket) {
    socket.join(socket.user._id.toString());
  }

  private async joinInAllConversationRooms(socket: UserSocket) {
    const conversations = await this.conversationService.findAllByUserId(socket.user._id);
    socket.join(conversations.map((conversation) => conversation._id.toString()));
    this.logger.log(`Connection established: ${socket.user.email}`);
  }

  private async sendUserData(socket: UserSocket, server: Server) {
    server.in(socket.id).emit(ChatEvents.USER_INIT, socket.user);
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
}
