import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { useContainer } from 'class-validator';
import { TransformResponseInterceptor } from 'common';
import { setupSwagger } from 'common/swagger';
import { AppModule } from './app.module';

const corsOptions = {
  development: { origin: '*' },
  production: { origin: [process.env.CLIENT_DOMAIN], methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'] },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const node_env = configService.get('NODE_ENV');

  app.enableCors(corsOptions[node_env]);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useWebSocketAdapter(new IoAdapter(app));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (node_env === 'development') {
    setupSwagger(app);
  }

  await app.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
  });
}
bootstrap();
