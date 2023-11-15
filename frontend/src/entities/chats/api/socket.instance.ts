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

  public async listenAll(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.listenerMap.forEach((cb, event) => {
      const promise = new Promise<void>((resolve, reject) => {
        this.chatSocket
          .on(event, cb)
          .then(() => resolve())
          .catch((reason) => reject(reason));
      });

      promises.push(promise);
    });

    await Promise.all(promises);
  }

  public removeAll() {
    this.listenerMap.forEach((cb, event) => {
      this.chatSocket.off(event, cb);
    });
  }
}
