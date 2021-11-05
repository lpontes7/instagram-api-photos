import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { writeFile as writeFileCallback } from 'fs';
import { promisify } from 'util';
import { LoggingInterceptor } from './utils/logging.interceptor';
import { ConfigService } from './config/config.service';

const writeFile = promisify(writeFileCallback);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  const options = new DocumentBuilder()
    .setTitle('instagram-api-photos')
    .setVersion('0.0.1')
    .build();

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('API_PORTA');

  const document = SwaggerModule.createDocument(app, options);

  await writeFile('swagger.json', JSON.stringify(document));
  try {
    SwaggerModule.setup('api', app, document, {
      customSiteTitle: 'instagram-api-photos',
    });
  } catch (e) {
    console.log(e);
  }

  await app.listen(port);
}
bootstrap();
