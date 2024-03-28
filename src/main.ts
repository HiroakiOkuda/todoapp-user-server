import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: [
      process.env.URL as string,
      ...(process.env.TODOAPP_ENV === 'development'
        ? ['http://localhost:3000', 'http://127.0.0.1:3000']
        : []),
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.TODOAPP_LISTEN_PORT as string, '0.0.0.0');
}
bootstrap();
