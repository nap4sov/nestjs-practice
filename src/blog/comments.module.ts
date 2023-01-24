import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://test-blog-api.ficuslife.com/api/v1/',
    }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
