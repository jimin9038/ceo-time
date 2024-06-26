import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.use(cookieParser())
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: 'https://www.ceotime.news',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['*'],
      exposedHeaders: ['Content-Type', 'Authorization', 'Email-Auth']
    })
    const config = new DocumentBuilder()
      .setTitle('CEO TIME')
      .setDescription('API description')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  } else {
    app.setGlobalPrefix('api')
  }

  await app.listen(4001)
}

bootstrap()
