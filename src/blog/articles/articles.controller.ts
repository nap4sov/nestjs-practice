import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, Article } from '../dto/article.dto';
import { User } from '../dto/user.dto';
import { Comment } from '../dto/comment.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: Article, isArray: true })
  @Get()
  async getAllArticles() {
    const response = await this.articlesService.getAllArticles();
    return response.data;
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of specific article',
  })
  @ApiResponse({ type: Article })
  @Get(':id')
  getArticleById(@Param() params) {
    return this.articlesService.getArticleById(params.id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of specific article',
  })
  @ApiResponse({ type: Comment, isArray: true })
  @Get(':id/comments')
  getCommentsByArticleId(@Param() params) {
    return this.articlesService.getCommentsByArticleId(params.id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of specific user',
  })
  @ApiResponse({ type: User })
  @Get('users/:id')
  getUserById(@Param() params) {
    return this.articlesService.getUserById(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ type: Article })
  @Post()
  async createArticle(@Body() newArticle: CreateArticleDto) {
    return this.articlesService.createArticle(newArticle);
  }
}
