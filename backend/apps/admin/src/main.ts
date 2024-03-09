import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AdminModule } from './admin.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AdminModule)
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: 'http://localhost:5525',
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
  await app.listen(3000)
}
bootstrap()
