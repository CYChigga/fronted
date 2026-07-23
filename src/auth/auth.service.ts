import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// 注入JwtService用于生成和验证token
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 生成token
  signToken(userId: number, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }

  // 验证token
  verifyToken(token: string): { sub: number; email: string } {
    return this.jwtService.verify(token);
  }
}
