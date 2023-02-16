import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  fullText: string;

  @ApiProperty()
  description: string;
}

export class Article {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  fullText: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  dateCreated: string;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  likes: string[];
  @ApiProperty({ nullable: true })
  postedBy: string | null;
}
