import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @Redirect('/api')
  async() {
    // return 'Hi there from nest demo server';
  }
}
