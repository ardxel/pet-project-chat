import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client';

export class SocketClient {
  private socket: Socket;

  connect(url: string, options: Partial<ManagerOptions & SocketOptions>) {
    if (this.socket) return;
    return new Promise((resolve) => {
      this.socket = io(url, options);
      resolve(void 1);
    });
  }

  disconnect() {
    return new Promise<void>((resolve) => {
      if (!this.socket) {
        // reject('No socket');
        return;
      }
      this.socket.disconnect();
      this.socket = null;
      resolve();
    });
  }

  emit(event: string, data?: unknown) {
    return new Promise((resolve, reject) => {
      if (!this.socket || (this.socket && !this.socket.active)) {
        // return reject('No socket connection.');
        return;
      }
      return this.socket.emit(event, data, (response: unknown) => {
        if (response) {
          resolve(response);
        } else {
          reject(undefined);
        }
      });
    });
  }

  on(event: string, fun: (...args: unknown[]) => unknown) {
    return new Promise((resolve) => {
      if (!this.socket || (this.socket && !this.socket.active)) {
        // return reject('No socket connection');
        return;
      }

      this.socket.on(event, fun);
      resolve(void 1);
    });
  }

  off(event: string, fun: (...args: unknown[]) => unknown) {
    if (!this.socket) return;
    this.socket.off(event, fun);
  }
}
