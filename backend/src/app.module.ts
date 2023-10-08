import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { HttpExceptionFilter, LoggerMiddleware } from 'common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    /* Config module */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /* Mongoose module */
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        const dbName = configService.get<string>('DB_NAME');
        return { uri, dbName } as MongooseModuleFactoryOptions;
      },
      inject: [ConfigService],
    }),
    /* Winston module */
    WinstonModule.forRoot({
      level: 'error',
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: 'errors.log' })],
    }),
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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
