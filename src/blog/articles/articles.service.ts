import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  IBlogArticle,
  IBlogResponse,
  IComment,
  IUser,
} from '../interfaces/response';

@Injectable()
export class ArticlesService implements OnModuleInit {
  private ficusApiToken = '';
  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    const {
      data: { token },
    } = await firstValueFrom(
      this.httpService
        .post('auth', {
          email: process.env.FICUS_API_LOGIN,
          password: process.env.FICUS_API_PASSWORD,
        })
        .pipe(
          catchError((error) => {
            if (error.code === 'ERR_BAD_REQUEST') {
              throw new HttpException(error.message, error.response?.status);
            }
            throw new Error(error.message);
          }),
        ),
    );
    this.ficusApiToken = token;
  }

  async getAllArticles(): Promise<IBlogResponse> {
    const response = await firstValueFrom(
      this.httpService.get<IBlogResponse>('posts').pipe(
        catchError((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            throw new HttpException(error.message, error.response?.status);
          }
          throw new Error(error.message);
        }),
      ),
    );

    return response.data;
  }

  async getArticleById(id: string): Promise<IBlogArticle> {
    const { data } = await firstValueFrom(
      this.httpService.get<IBlogArticle>('posts/' + id).pipe(
        catchError((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            throw new HttpException(error.message, error.response?.status);
          }
          throw new Error(error.message);
        }),
      ),
    );
    return data;
  }

  async getCommentsByArticleId(id: string): Promise<IComment[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<IComment[]>('comments/post/' + id).pipe(
        catchError((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            throw new HttpException(error.message, error.response?.status);
          }
          throw new Error(error.message);
        }),
      ),
    );
    return data;
  }

  async getUserById(id: string): Promise<IUser> {
    const { data } = await firstValueFrom(
      this.httpService.get<IUser>('users/' + id).pipe(
        catchError((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            throw new HttpException(error.message, error.response?.status);
          }
          throw new Error(error.message);
        }),
      ),
    );

    return data;
  }

  async createArticle(article): Promise<IBlogArticle> {
    const { data } = await firstValueFrom(
      this.httpService
        .post('posts', article, {
          headers: {
            Authorization: 'Bearer ' + this.ficusApiToken,
          },
        })
        .pipe(
          catchError((error) => {
            const message = error.response.data.error[0].message;
            throw new HttpException(message, 400);
          }),
        ),
    );
    return data;
  }
}
