import { Controller, Get } from '@nestjs/common'
import { UseRolesGuard } from '@libs/auth'
import { AdminService } from './admin.service'

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseRolesGuard('Admin')
  @Get()
  getHello(): string {
    return this.adminService.getHello()
  }
}
