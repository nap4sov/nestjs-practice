import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://test-blog-api.ficuslife.com/api/v1/',
    }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesResolver],
})
export class ArticlesModule {}
