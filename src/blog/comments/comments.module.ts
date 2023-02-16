import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.FICUS_API_URL,
      }),
    }),
  ],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
