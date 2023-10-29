import { WsException } from '@nestjs/websockets';

export class WsExceptionWithEvent extends WsException {
  public readonly exceptionEvent: string;
  constructor(message: string, exceptionEvent: string) {
    super(message);
    this.exceptionEvent = exceptionEvent;
  }
}
