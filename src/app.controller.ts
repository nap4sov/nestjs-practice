import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async indexPage() {
    return 'Hi there from nest demo server';
  }
}
