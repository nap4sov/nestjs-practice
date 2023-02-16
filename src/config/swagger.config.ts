import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addServer(process.env.PROD_URL, 'Prod')
    .addServer(`http://localhost:${process.env.PORT}`, 'Local')
    .addBearerAuth()
    .setTitle('NestJS demo server')
    .setDescription(
      'RESTful Api, GraphQL support, Auth0 strategy, cron jobs and all that stuff',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
