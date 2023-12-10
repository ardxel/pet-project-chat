import { CallEndReason, IMessage, MessageType, ParsedCallText } from '../model';

class MessageUtils {
  public isMine<T extends IMessage, U extends string>(message: T, userId: U): boolean {
    return message.sender === userId;
  }

  public getLastUpdatedTime<T extends IMessage>(message: T): string {
    return message.updatedAt;
  }

  public showUpdatedTime<T extends IMessage>(message: T): boolean {
    return message.updatedAt !== message.createdAt;
  }

  /**
   * Если сообщение не имеет свойства type, то тогда будет возвращен тип 'text'
   */
  public getType<T extends IMessage>(message: T): MessageType {
    return !message.type ? 'text' : message.type;
  }

  public parseCallText<T extends IMessage>(message: T): ParsedCallText {
    if (this.getType(message) !== 'call') return;

    const splitted: any[] = message.text.split('.');
    splitted[2] = parseInt(splitted[2]);

    const [reason, type, seconds] = splitted as [CallEndReason, MessageType, number];

    return { reason, type, seconds };
  }
}

export const messageUtils = new MessageUtils();
