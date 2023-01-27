import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { MailingService } from './mailing.service';
import { IStatObject } from './mailing.interfaces';
import { composeStatsEmail } from './mailing.helpers';

@Controller('mailing')
export class MailingController {
  private readonly logger = new Logger(MailingController.name);
  constructor(private readonly mailingService: MailingService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  @Get('stats')
  async getStats(): Promise<IStatObject[]> {
    const stats = await this.mailingService.getBtcStats();
    return stats;
  }

  @Post('stats')
  async sendStatEmail(@Body() body: { email: string }) {
    const stats = await this.mailingService.getBtcStats();
    const email = composeStatsEmail(body.email, stats);

    await sgMail.send(email);
    this.logger.log('Email sent');
  }
}
