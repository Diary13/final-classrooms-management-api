import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors());
  app.setGlobalPrefix('api');
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.use('/uploads', express.static('uploads'));

  const config = new DocumentBuilder()
    .setTitle('Api Documentations')
    .setDescription('Api de gestion des salles')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
