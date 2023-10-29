import { Injectable } from '@nestjs/common';
import { AuthService } from 'modules/auth';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService) {}

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
