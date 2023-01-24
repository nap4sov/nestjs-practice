import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Logger } from 'nestjs-pino';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  // app.useLogger(app.get(Logger));
  await app.listen(PORT);
}
bootstrap();
