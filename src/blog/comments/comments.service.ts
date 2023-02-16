import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IComment, IUser } from '../interfaces/response';

@Injectable()
export class CommentsService {
  constructor(private readonly httpService: HttpService) {}

  async getCommentById(id: string): Promise<IComment> {
    const { data } = await firstValueFrom(
      this.httpService.get<IComment>('comments/' + id),
    );

    return data;
  }

  async getCommentAuthorById(id: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<IUser>('users/' + id),
    );
    return data;
  }
}
