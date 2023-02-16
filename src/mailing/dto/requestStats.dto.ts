import { ApiProperty } from '@nestjs/swagger';

export class RequestStatsDto {
  @ApiProperty()
  email: string;
}

export class Stats {
  @ApiProperty()
  averagePrice: string;
  @ApiProperty()
  timeStamp: number;
}
