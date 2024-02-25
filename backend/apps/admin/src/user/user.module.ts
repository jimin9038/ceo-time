import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [RolesModule],
  providers: [UserService, UserController]
})
export class UserModule {}
