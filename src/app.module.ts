import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_FILTER } from '@nestjs/core';
import { join } from 'path';
import { apolloDriverConfig } from './config/apolloDriver.config';
import { BlogModule } from './blog/blog.module';
import { AuthzModule } from './authz/authz.module';
import { TasksModule } from './tasks/tasks.module';
import { BinanceModule } from './binance/binance.module';
import { ChatEventsModule } from './chat/events.module';
import { MailingModule } from './mailing/mailing.module';
import { AppController } from './app.controller';
import { AllExceptionsFilter } from './common/exceptionFilters/allException.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot(apolloDriverConfig),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    BlogModule,
    AuthzModule,
    TasksModule,
    BinanceModule,
    ChatEventsModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
