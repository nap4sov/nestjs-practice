import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('blog')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //   @Get()
  //   async getAllArticles() {
  //     const response = await this.blogService.getAllArticles();
  //     return response.data;
  //   }

  //   @Get(':id')
  //   getArticleById(@Param() params) {
  //     return this.blogService.getArticleById(params.id);
  //   }

  //   @Get(':id/comments')
  //   getCommentsByArticleId(@Param() params) {
  //     return this.blogService.getCommentsByArticleId(params.id);
  //   }

  //   @Get('users/:id')
  //   getUserById(@Param() params) {
  //     return this.blogService.getUserById(params.id);
  //   }
}
