import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty()
  _id: 'string';
  @ApiProperty()
  commentedBy: 'string';
  @ApiProperty()
  followedCommentID: 'string';
  @ApiProperty()
  postID: 'string';
  @ApiProperty()
  text: 'string';
  @ApiProperty()
  dateCreated: 'string';
  @ApiProperty()
  likes: 'string'[];
}
