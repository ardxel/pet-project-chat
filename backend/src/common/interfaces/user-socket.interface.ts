import { User } from 'schemas';
import { Socket } from 'socket.io';

export interface UserSocket extends Socket {
  user: User;
}
