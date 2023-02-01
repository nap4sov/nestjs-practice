import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BlogModule } from './blog/blog.module';
import { AuthzModule } from './authz/authz.module';
import { TasksModule } from './tasks/tasks.module';
import { BinanceModule } from './binance/binance.module';
import { ChatEventsModule } from './chat/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailingModule } from './mailing/mailing.module';
import { AppController } from './app.controller';
import { AllExceptionsFilter } from './common/exceptionFilters/allException.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      include: [BlogModule],
      introspection: true,
      playground: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION, {
      connectionName: 'messages',
    }),
    ScheduleModule.forRoot(),
    BlogModule,
    AuthzModule,
    TasksModule,
    BinanceModule,
    ChatEventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
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
