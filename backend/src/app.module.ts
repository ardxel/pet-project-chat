import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter, LoggerMiddleware } from 'common';
import cors from 'cors';
import { AuthModule, UserModule } from 'modules';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isDevMode } from './utils';

@Module({
  imports: [
    /* Config module */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /* Mongoose module */
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: configService.get<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    /* Winston module */
    WinstonModule.forRoot({
      level: 'error',
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: 'errors.log' })],
    }),
    /* Authentication module */
    AuthModule,
    // /* User module */
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* custom http exception filter for handling errors */
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (isDevMode()) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }

    if (!isDevMode()) {
      consumer.apply(cors({ origin: [process.env.CLIENT_DOMAIN], methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'] }));
    }
  }
}
