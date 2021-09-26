import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');                 // we add /api prefix 
  app.useGlobalPipes(new ValidationPipe());   // validation pipes for scheme
  app.enableCors();                           // we enable cross-origin resource sharing
  await app.listen(3000);
}
bootstrap();
