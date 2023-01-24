import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Module({
  imports: [HttpModule],
  providers: [BinanceService],
})
export class BinanceModule {}
