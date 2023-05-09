/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getHello());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/secure')
  getProtectedResource(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getSecureResource());
  }
}
