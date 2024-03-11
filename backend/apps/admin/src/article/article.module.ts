import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { S3Client } from '@aws-sdk/client-s3'
import * as mime from 'mime-types'
import s3Storage from 'multer-s3'
import * as multerS3 from 'multer-s3'
import { RolesModule } from '@libs/auth'
import { ArticleController } from './article.controller'
import { S3StorageController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [
    RolesModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const s3 = new S3Client({
          region: configService.get('AWS_REGION'),
          credentials: {
            accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY')
          }
        })

        return {
          storage: s3Storage({
            s3,
            bucket: configService.get('AWS_S3_BUCKET'),
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key(req, file, cb) {
              cb(
                null,
                `${new Date().getTime()}.${mime.extension(file.mimetype)}`
              )
            }
          }),
          limits: {
            fileSize: 1024 * 1024 * 5, // 5 MB
            files: 1
          },
          fileFilter(req, file, callback) {
            callback(null, true)
          }
        }
      }
    })
  ],
  controllers: [ArticleController, S3StorageController],
  providers: [ArticleService]
})
export class ArticleModule {}
