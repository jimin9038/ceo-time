import { Module } from '@nestjs/common'
import { PrismaModule } from '@libs/prisma'
import { RolesService } from './roles.service'

@Module({
  providers: [RolesService],
  exports: [RolesService],
  imports: [PrismaModule]
})
export class RolesModule {}
