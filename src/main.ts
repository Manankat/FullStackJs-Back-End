import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Full Stack JS - Chinese Checker API')
    .setDescription('Full Stack JS API, is a api running to support a Chinese Checker website, using a PostgreSQL database.')
    .setVersion('0.1')
    .addTag('Full Stack JS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
