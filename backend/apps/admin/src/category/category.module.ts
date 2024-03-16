import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { CategoryController } from './category.controller'
import { S3StorageController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [RolesModule],
  controllers: [CategoryController, S3StorageController],
  providers: [CategoryService]
})
export class CategoryModule {}
