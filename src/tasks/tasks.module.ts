import { Module } from '@nestjs/common';
import { BinanceModule } from 'src/binance/binance.module';
import { BinanceService } from 'src/binance/binance.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [BinanceModule],
  providers: [TasksService, BinanceService],
})
export class TasksModule {}
