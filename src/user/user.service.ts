import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './user.input';

const SALT_ROUNDS = 10;

// 封装数据库操作 登录鉴权
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService, // 数据库操作
    private authService: AuthService, // JWT
  ) {}

  // 查全部用户
  async findAll() {
    return this.prisma.user.findMany();
  }

  // 按ID查单个用户
  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // 按邮箱查用户（登录相关查询用）
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // 注册 密码加密后入库
  async create(input: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
    return this.prisma.user.create({
      data: { ...input, password: hashedPassword },
    });
  }

  // 删除用户
  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  // 登录
  async login(email: string, password: string) {
    // 查邮箱是否存在
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, message: '用户不存在', user: null, token: null };
    }

    // 密码比对
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: '密码错误', user: null, token: null };
    }

    // 生成token7天有效
    const token = this.authService.signToken(user.id, user.email);
    return { success: true, message: '登录成功', user, token };
  }
}
