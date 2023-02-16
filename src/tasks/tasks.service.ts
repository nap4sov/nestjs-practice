import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Parser } from '@json2csv/plainjs';
import { BinanceService } from 'src/binance/binance.service';
import { writeToCsv } from 'src/common/helpers/storage.helper';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly binanceService: BinanceService) {}

  @Cron(CronExpression.EVERY_5_MINUTES, { name: 'btc_average' })
  async writeBtcAveragePrice() {
    const data = await this.binanceService.getAveragePrice();
    const parser = new Parser({
      header: false,
    });
    const parsedData = parser.parse(data);

    await writeToCsv({
      directory: 'storage',
      fileName: 'btc_average.csv',
      data: parsedData + '\n',
      headers: 'averagePrice, timeStamp',
    });

    process.env.NODE_ENV === 'development' &&
      this.logger.log('Written to file');
  }
}
