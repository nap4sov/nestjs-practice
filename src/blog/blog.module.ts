import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles.module';
import { CommentsModule } from './comments.module';

@Module({
  imports: [ArticlesModule, CommentsModule],
  exports: [ArticlesModule, CommentsModule],
})
export class BlogModule {}
