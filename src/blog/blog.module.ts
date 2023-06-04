import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ArticlesModule, CommentsModule],
})
export class BlogModule {}
