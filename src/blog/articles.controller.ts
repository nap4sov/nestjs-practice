import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions/permissions.decorator';
import { PermissionsGuard } from '../permissions/permissions.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('items')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getAllArticles() {
    const response = await this.articlesService.getAllArticles();
    return response.data;
  }

  @Get(':id')
  getArticleById(@Param() params) {
    return this.articlesService.getArticleById(params.id);
  }

  @Get(':id/comments')
  getCommentsByArticleId(@Param() params) {
    return this.articlesService.getCommentsByArticleId(params.id);
  }

  @Get('users/:id')
  getUserById(@Param() params) {
    return this.articlesService.getUserById(params.id);
  }
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions('create:items')
  async createArticle(@Body() newArticle: CreateArticleDto) {
    try {
      const response = await this.articlesService.createArticle(newArticle);
      return response;
    } catch (error) {
      Logger.error(error);
    }
  }
}
