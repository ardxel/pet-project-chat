import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter, LoggerMiddleware, ObjectIdValidationPipe } from 'common';
import { AuthModule, UserModule } from 'modules';
import { DatabaseModule } from 'modules/database';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { B2Module } from './modules/b2/b2.module';
import { ChatModule } from './modules/chat/chat.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { isDevMode } from './utils';

@Module({
  imports: [
    /* Config module */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /* Winston module */
    WinstonModule.forRoot({
      level: 'error',
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: 'errors.log' })],
    }),
    /* Database module */
    DatabaseModule,
    /* Authentication module */
    AuthModule,
    /* User module */
    UserModule,
    /* Chat module */
    ChatModule,
    /* Message module */
    MessageModule,
    /* Conversation Module */
    ConversationModule,
    /* Backblaze Module */
    B2Module,
  ],
  controllers: [AppController],
  providers: [
    ObjectIdValidationPipe,
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
  }
}
