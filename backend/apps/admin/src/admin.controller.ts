import { Controller, Get } from '@nestjs/common'
import { AuthNotNeededIfOpenSpace } from '@libs/auth'
import { AdminService } from './admin.service'

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @AuthNotNeededIfOpenSpace()
  @Get()
  getHello(): string {
    return this.adminService.getHello()
  }
}
