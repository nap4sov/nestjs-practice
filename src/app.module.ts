import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BlogModule } from './blog/blog.module';
import { AuthzModule } from './authz/authz.module';
import { LoggerModule } from 'nestjs-pino';
import { TasksModule } from './tasks/tasks.module';
import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      include: [BlogModule],
    }),
    ScheduleModule.forRoot(),
    BlogModule,
    AuthzModule,
    TasksModule,
    BinanceModule,
  ],
})
export class AppModule {}
