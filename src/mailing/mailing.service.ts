import { Injectable } from '@nestjs/common';
import {
  fieldDelimiter,
  formatValueByType,
  getJsonFromCsv,
} from 'convert-csv-to-json';
import { IStatObject } from './mailing.interfaces';

@Injectable()
export class MailingService {
  async getBtcStats(): Promise<IStatObject[]> {
    fieldDelimiter(',');
    formatValueByType();
    const parsedStats = getJsonFromCsv(
      'storage/btc_average.csv',
    ) as IStatObject[];
    return parsedStats;
  }
}
