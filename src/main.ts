// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   // Enable CORS with more permissive settings for development
//   app.enableCors({
//     origin: [
//       'http://localhost:3000',
//       'http://localhost:3001',
//       'http://127.0.0.1:3000',
//       'http://127.0.0.1:3001',
//       'http://localhost:3002',
//       'http://127.0.0.1:3002',
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
//   });

//   // Global validation pipe
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     forbidNonWhitelisted: true,
//     transform: true,
//   }));

//   // Global exception filter for file upload errors
//   app.use((error, req, res, next) => {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         message: 'File too large. Maximum size is 100MB.',
//         error: 'FILE_TOO_LARGE'
//       });
//     }
//     if (error.message === 'Invalid file type') {
//       return res.status(400).json({
//         message: 'Invalid file type. Please upload a supported file format.',
//         error: 'INVALID_FILE_TYPE'
//       });
//     }
//     next(error);
//   });

//   // Serve static files from uploads directory
//   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/',
//   });

//   // Swagger documentation
//   const config = new DocumentBuilder()
//     .setTitle('WeSourceYou API')
//     .setDescription('Mediation platform connecting journalists and media companies worldwide')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   const port = process.env.PORT || 3001;
//   await app.listen(port);
//   console.log(`Application is running on: http://localhost:${port}`);
//   console.log(`Swagger documentation: http://localhost:${port}/api`);
//   console.log('CORS enabled for:', [
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'http://127.0.0.1:3000',
//     'http://127.0.0.1:3001',
//     'http://localhost:3002',
//     'http://127.0.0.1:3002',
//   ]);
// }
// bootstrap();


import { Server } from "http";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as express from "express";

const server = express();

async function bootstrap(expressInstance: any): Promise<Server> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export const handler = async (req: any, res: any) => {
  const expressApp = await bootstrap(server);
  return expressApp(req, res);
};
