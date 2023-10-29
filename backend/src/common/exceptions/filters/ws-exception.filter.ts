import { ArgumentsHost, Logger, WsExceptionFilter } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { isDevMode } from 'utils';
import { WsExceptionWithEvent } from '../ws-exception-with-event.exception';

export class BaseWsExceptionFilter implements WsExceptionFilter {
  private static readonly logger = new Logger('WsExceptionsHandler');

  public catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.handleError(client, exception);
  }

  public handleError(client: Socket, exception: WsException) {
    let exceptionEvent = 'error';
    let status = 'error';
    if (exception instanceof WsExceptionWithEvent) {
      console.log('is custom');
      exceptionEvent = exception.exceptionEvent;
      status = 'fail';
    }

    const message = exception.message;
    const stack = isDevMode() ? exception.stack : undefined;
    const result = { status, message, stack };

    client.emit(exceptionEvent, result);
  }

  public isExceptionObject(err: any): err is Error {
    return isObject(err) && !!(err as Error).message;
  }
}
