import { Controller, Get } from '@nestjs/common'
import { AuthNotNeededIfOpenSpace } from '@libs/auth'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AuthNotNeededIfOpenSpace()
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
