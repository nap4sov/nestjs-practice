import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Query('comment')
  async comment(@Args('id') id: string) {
    return this.commentsService.getCommentById(id);
  }

  @ResolveField('commentedBy')
  async commentAuthor(@Parent() comment) {
    try {
      const { commentedBy } = comment;
      const user = await this.commentsService.getCommentAuthorById(commentedBy);
      return user;
    } catch (error) {
      return null;
    }
  }
}
