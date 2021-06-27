import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestFactory.create() : appliaction instance 반환
  await app.listen(3000);
}
bootstrap();
