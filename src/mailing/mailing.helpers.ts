import * as moment from 'moment';
import * as pug from 'pug';
import { IStatObject } from './mailing.interfaces';

const compiledStatsFunction = pug.compileFile(
  'src/mailing/templates/statsEmail.pug',
);

export const composeStatsEmail = (recipient: string, stats: IStatObject[]) => {
  const htmlTable = compiledStatsFunction(
    stats.map((stat) => ({
      ...stat,
      timeStamp: moment(stat.timeStamp).format('DD MMM YYYY HH:mm'),
    })),
  );

  return {
    to: recipient,
    from: process.env.SENDGRID_SENDER,
    subject: 'BTC stats',
    html: htmlTable,
  };
};
