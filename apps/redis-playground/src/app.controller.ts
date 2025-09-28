import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get/:key')
  getKey(@Param('key') key: string) {
    return this.appService.getCacheKey(key);
  }

  @Post('set')
  setKey(@Query('key') key: string, @Query('value') value: string) {
    return this.appService.setCacheKey(key, value)
  }
}
