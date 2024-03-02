import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Scrum estimation dummy backend')
    .setDescription('A fake backend for the scrum estimation api')
    .setVersion('0.0001beta')
    .addTag('scrum')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(port);

  const logger = new Logger('main');
  logger.log(`Server ready at http://localhost:${port}`);
}
bootstrap();
