import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();

  await app.listen(PORT);
}
bootstrap();
