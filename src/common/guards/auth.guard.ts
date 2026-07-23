import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from '../../auth/auth.service';

// 定义路由守卫 不登录不能访问
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req: Request = ctx.getContext().req;

    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');

    try {
      const user = this.authService.verifyToken(token);
      // 把解析出的用户信息挂到 request 上
      (req as unknown as Record<string, unknown>).user = user;
      return true;
    } catch {
      return false;
    }
  }
}
