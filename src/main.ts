// 后端入口启动NestJS应用
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 创建 NestJS 应用实例
  const app = await NestFactory.create(AppModule);

  // 全局参数校验管道
  app.useGlobalPipes(new ValidationPipe());

  // 允许前端跨域请求
  app.enableCors({ origin: '*' });

  // 启动 HTTP 服务
  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
