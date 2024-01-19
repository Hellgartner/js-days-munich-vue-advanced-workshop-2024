import { NestFactory } from '@nestjs/core';
import { Logger, Injectable } from '@nestjs/common';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);

  const logger = new Logger('main');
  logger.log(`Server ready at http://localhost:${port}`);
}
bootstrap();
