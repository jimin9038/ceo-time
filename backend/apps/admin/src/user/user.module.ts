import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [RolesModule],
  providers: [UserService, UserController]
})
export class UserModule {}
