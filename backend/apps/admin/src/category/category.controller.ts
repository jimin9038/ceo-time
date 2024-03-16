import {
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Injectable,
  type PipeTransform,
  BadRequestException,
  Get,
  Logger,
  InternalServerErrorException,
  Param,
  NotFoundException,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  Put,
  Delete
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Prisma } from '@prisma/client'
import { AuthNotNeededIfOpenSpace, AuthenticatedRequest } from '@libs/auth'
import { CategoryService } from './category.service'
import { ChangeCategoryDto } from './dto/change-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'

@Injectable()
export class CursorValidationPipe implements PipeTransform {
  transform(value: unknown) {
    if (value == null) {
      return null
    } else if (typeof value === 'string') {
      const cursor = parseInt(value)
      if (cursor > 0) {
        return cursor
      }
    }
    throw new BadRequestException('Cursor must be a positive number')
  }
}
// @UseRolesGuard('Admin')
@AuthNotNeededIfOpenSpace()
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name)

  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategorys(
    @Query('cursor', CursorValidationPipe)
    cursor: number | null,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number
  ) {
    try {
      return await this.categoryService.getCategorys({
        cursor,
        take
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Get(':id')
  async getCategoryByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.categoryService.getCategoryByID(id)
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.name === 'NotFoundError'
      ) {
        throw new NotFoundException(error.message)
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Post()
  async createCategory(
    @Req() req: AuthenticatedRequest,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    await this.categoryService.createCategory(createCategoryDto)
  }

  @Put()
  async changeCategory(
    @Req() req: AuthenticatedRequest,
    @Body() changeCategoryDto: ChangeCategoryDto
  ) {
    try {
      await this.categoryService.changeCategory(changeCategoryDto)
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.name === 'NotFoundError'
      ) {
        throw new NotFoundException(error.message)
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.categoryService.deleteCategory(id)
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.name === 'NotFoundError'
      ) {
        throw new NotFoundException(error.message)
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }
}

@AuthNotNeededIfOpenSpace()
@Controller('s3')
export class S3StorageController {
  constructor() {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return file
  }
}
