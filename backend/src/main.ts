import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TransformResponseInterceptor } from 'common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  await app.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
  });
}
bootstrap();
