import { Controller, Get, Post } from '@nestjs/common';
import { AuthService, Hello } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  setHello(): Hello {
    return this.appService.setHello();
  }
}
