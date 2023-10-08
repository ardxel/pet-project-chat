import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { isDevMode } from 'utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    if (isDevMode()) {
      const { ip, method, originalUrl } = req;
      res.on('finish', () => {
        const { statusCode } = res;
        this.logger.log(`${method} ${originalUrl} ${statusCode} ${ip}`);
      });
    }
    next();
  }
}
