import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  const config = new DocumentBuilder()
    .setTitle('food')
    .setDescription('Food Court API documentation')
    .setVersion('1.0.1')
    .addTag('food-court')
    .build();
    

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT,'0.0.0.0');
  console.log(`the application is running on: ${await app.getUrl()}`); 
}

bootstrap();
