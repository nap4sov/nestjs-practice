import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  IBlogArticle,
  IBlogResponse,
  IComment,
  IUser,
} from './interfaces/response';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);
  constructor(private readonly httpService: HttpService) {}

  async getAllArticles(): Promise<IBlogResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<IBlogResponse>('posts').pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async getArticleById(id: string): Promise<IBlogArticle> {
    const { data } = await firstValueFrom(
      this.httpService.get<IBlogArticle>('posts/' + id).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async getCommentsByArticleId(id: string): Promise<IComment[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<IComment[]>('comments/post/' + id).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async getUserById(id: string): Promise<IUser> {
    const { data } = await firstValueFrom(
      this.httpService.get<IUser>('users/' + id).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async createArticle(article) {
    const {
      data: { token },
    } = await firstValueFrom(
      this.httpService
        .post('auth', {
          email: 'billjobs@gmail.com',
          password: '$Sixty9$',
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    const { data } = await firstValueFrom(
      this.httpService
        .post('posts', article, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .pipe(
          catchError((error) => {
            throw new HttpException(error.response.data.error, 400);
          }),
        ),
    );
    return data;
  }
}
