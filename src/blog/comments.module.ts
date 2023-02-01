import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://test-blog-api.ficuslife.com/api/v1/',
    }),
  ],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
