import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { MailingService } from './mailing.service';
import { IStatObject } from './mailing.interfaces';
import { composeStatsEmail } from './mailing.helpers';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  @Get('stats')
  async getStats(): Promise<IStatObject[]> {
    const stats = await this.mailingService.getBtcStats();
    return stats;
  }

  @Post('stats')
  @HttpCode(202)
  async sendStatEmail(@Body() body: { email: string }) {
    const stats = await this.mailingService.getBtcStats();
    const email = composeStatsEmail(body.email, stats);

    try {
      await sgMail.send(email);
      return { message: 'Email sent for processing' };
    } catch (error) {
      if (error.code === 403) {
        throw new HttpException(
          'The from address does not match a verified Sender Identity',
          error.code,
        );
      }
      throw new HttpException(error.message, error.code);
    }
  }
}
