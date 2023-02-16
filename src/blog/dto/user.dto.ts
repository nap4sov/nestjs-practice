import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  _id: 'string';
  @ApiProperty()
  email: 'string';
  @ApiProperty()
  name: 'string';
  @ApiProperty()
  avatar?: 'string';
  @ApiProperty()
  extra_details?: 'string';
  @ApiProperty()
  skills?: 'string';
  @ApiProperty()
  profession?: 'string';
  @ApiProperty()
  details?: 'string';
  @ApiProperty()
  dateCreated: 'string';
}
