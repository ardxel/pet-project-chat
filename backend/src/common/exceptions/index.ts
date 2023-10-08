import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { isDevMode } from 'utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    const response = context.getResponse<Response>();
    const message = exception.message;

    const stack = isDevMode() ? exception.stack : undefined;
    response.status(status).json({ status: 'error', message, stack });
  }
}
