import { SocketClient } from 'shared/api';

export const chatSocket = new SocketClient();

export class ChatSocketListener {
  private listenerMap: Map<string, (...args: any[]) => any> = new Map();
  private readonly chatSocket: SocketClient = chatSocket;

  public set(event: string, cb: (...args: any[]) => any) {
    if (!this.listenerMap.has(event)) {
      this.listenerMap.set(event, cb);
    }
  }

  public listenAll() {
    this.listenerMap.forEach((cb, event) => {
      this.chatSocket.on(event, cb);
    });
  }

  public removeAll() {
    this.listenerMap.forEach((cb, event) => {
      this.chatSocket.off(event, cb);
    });
  }
}
