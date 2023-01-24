import { Injectable, Logger } from '@nestjs/common';
import { Spot } from '@binance/connector';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly client = new Spot(
    process.env.BINANCE_API_KEY,
    process.env.BINANCE_SECRET,
  );

  async getAccountData() {
    const { data } = await this.client.account();
    return data;
  }

  async getAveragePrice() {
    const { data } = await this.client.avgPrice('BTCUSDT');
    return { price: data.price, timestamp: Date.now() };
  }
}
