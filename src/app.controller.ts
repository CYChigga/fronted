import { Controller, Get, Post, Delete } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 定义用户控制器
@Controller('users')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  // 新增演示用户
  @Post()
  async create() {
    await this.prismaService.user.deleteMany({
      where: { email: 'demo@example.com' },
    });

    const newUser = await this.prismaService.user.create({
      data: {
        name: 'Demo User',
        email: 'demo@example.com',
        password: '123456',
      },
    });
    return newUser;
  }

  // 查询全部用户
  @Get()
  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  // 删除演示用户
  @Delete()
  async remove() {
    const deletedUser = await this.prismaService.user.deleteMany({
      where: { email: 'demo@example.com' },
    });
    return deletedUser;
  }
}
