import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config/swagger.config';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  configSwagger(app);

  await app.listen(PORT || 3000);
}
bootstrap();
