/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import 'reflect-metadata';
import { MyLogger } from './loger/my.loger.service';

const PORT: number = Number(process.env.PORT) || 4000;
console.log(PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new MyLogger(),
    bufferLogs: true,
  });
  app.useLogger(new MyLogger());
  await app.listen(PORT);
}
bootstrap();
