import * as moment from 'moment';
import { IStatObject } from './mailing.interfaces';

const createStatsEmailMarkup = (stats: IStatObject[]) => {
  return `<h2 style="text-align: center">Requested Bitcoin stats</h2><table style="border-collapse: collapse; width: 100%;"><tr><th style="padding: 15px; background-color: #04aa6d; color: white">Average price</th><th style="padding: 15px; background-color: #04aa6d; color: white">Time</th></tr>${stats
    .map(
      ({ averageprice, timestamp }, idx) =>
        `<tr ${
          idx % 2 !== 0 && 'style="background-color: #f2f2f2"'
        }><td style="padding: 15px; text-align: center;">${averageprice
          .split('"')
          .join(
            '',
          )}</td><td style="padding: 15px; text-align: center;">${moment(
          timestamp,
        ).format('DD MMM YYYY HH:mm')}</td></tr>`,
    )
    .join('')}</table>`;
};

export const composeStatsEmail = (recipient: string, stats: IStatObject[]) => {
  const htmlTable = createStatsEmailMarkup(stats);

  return {
    to: recipient,
    from: process.env.SENDGRID_SENDER,
    subject: 'BTC stats',
    html: htmlTable,
  };
};
