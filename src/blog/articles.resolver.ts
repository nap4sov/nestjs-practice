import { Body } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article.dto';

@Resolver('Article')
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {}

  @Query('allArticles')
  async allArticles() {
    const response = await this.articlesService.getAllArticles();
    return response.data;
  }

  @Query('article')
  async article(@Args('id') id: string) {
    return this.articlesService.getArticleById(id);
  }

  @ResolveField('comments')
  async comments(@Parent() article) {
    const { _id: id } = article;
    return this.articlesService.getCommentsByArticleId(id);
  }

  @ResolveField('postedBy')
  async articleAuthor(@Parent() article) {
    const { postedBy } = article;
    return postedBy ? this.articlesService.getUserById(postedBy) : null;
  }

  @Mutation()
  async addArticle(@Body() body: { article: CreateArticleDto }) {
    return this.articlesService.createArticle(body.article);
  }
}
