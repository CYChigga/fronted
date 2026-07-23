import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'], // 扫描所有.graphql文件构建Schema
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'), // 自动生成TS接口
      },
      playground: true, // Playground界面
      introspection: true, // 允许客户端查询Schema结构
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
