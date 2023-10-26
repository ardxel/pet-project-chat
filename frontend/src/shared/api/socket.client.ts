import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client';

export class SocketClient {
  private socket: Socket;

  connect(url: string, options: Partial<ManagerOptions & SocketOptions>) {
    if (this.socket) return;
    this.socket = io(url, options);
    return new Promise<void>((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', () => reject());
    });
  }

  disconnect() {
    if (!this.socket) return;
    return new Promise<void>((resolve) => {
      this.socket.disconnect();
      this.socket = null;
      resolve();
    });
  }

  emit(event: string, data: unknown) {
    return new Promise((resolve, reject) => {
      if (!this.socket || (this.socket && !this.socket.active)) {
        return reject('No socket connection.');
      }
      return this.socket.emit(event, data, (response: unknown) => {
        if (response) {
          resolve(response);
        } else {
          reject('ERROR');
        }
      });
    });
  }

  on(event: string, fun: (...args: unknown[]) => unknown) {
    return new Promise((resolve, reject) => {
      if (!this.socket || (this.socket && !this.socket.active)) {
        return reject('No socket connection');
      }

      this.socket.on(event, fun);
      resolve(void 1);
    });
  }
}
