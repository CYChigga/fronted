import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

//模块化jwt
@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'dev-secret',
      signOptions: { expiresIn: '7d' }, // token 7 天过期
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
