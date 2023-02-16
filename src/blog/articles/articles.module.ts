import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.FICUS_API_URL,
      }),
    }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesResolver],
})
export class ArticlesModule {}
