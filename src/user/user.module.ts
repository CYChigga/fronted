import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

// 模块化用户服务
@Module({
  imports: [AuthModule],
  providers: [PrismaService, UserService, UserResolver],
})
export class UserModule {}
