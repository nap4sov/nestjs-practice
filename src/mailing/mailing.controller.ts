import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailingService } from './mailing.service';
import { IStatObject } from './mailing.interfaces';
import { RequestStatsDto, Stats } from './dto/requestStats.dto';
import { composeStatsEmail } from './mailing.helpers';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Sendgrid mailing')
@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  @ApiResponse({ type: Stats, isArray: true, status: 200 })
  @Get('stats')
  async getStats(): Promise<IStatObject[]> {
    const stats = await this.mailingService.getBtcStats();
    return stats;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 202,
    description: 'Request forwarded for processing',
  })
  @Post('stats')
  @HttpCode(202)
  async sendStatEmail(@Body() body: RequestStatsDto) {
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
